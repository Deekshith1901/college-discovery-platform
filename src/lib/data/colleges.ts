import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fallbackColleges } from "@/lib/data/fallback";
import type { College, CollegeFilters } from "@/types/college";

type CollegeRow = Partial<College> &
  Record<string, unknown> & {
    college_id?: string;
    id?: string;
  };

function getValueByAliases(
  row: CollegeRow,
  aliases: string[],
  keywordFallbacks: string[] = [],
): unknown {
  for (const alias of aliases) {
    if (row[alias] !== undefined && row[alias] !== null) return row[alias];
  }

  const entries = Object.entries(row);
  for (const [key, value] of entries) {
    const normalizedKey = key.toLowerCase();
    if (
      keywordFallbacks.length &&
      keywordFallbacks.every((keyword) => normalizedKey.includes(keyword))
    ) {
      if (value !== undefined && value !== null) return value;
    }
  }

  return undefined;
}

function normalizeText(value: unknown): string {
  if (value === undefined || value === null) return "";
  const text = String(value).trim();
  if (!text) return "";
  const lower = text.toLowerCase();
  if (["null", "undefined", "n/a", "na", "nan", "[]", "{}"].includes(lower)) return "";
  return text;
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeText(item))
      .filter(Boolean);
  }
  if (typeof value === "string") {
    if (!normalizeText(value)) return [];
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => normalizeText(item))
          .filter(Boolean);
      }
    } catch {
      return value
        .replace(/[{}]/g, "")
        .split(/[,\n;|]/)
        .map((item) => item.replace(/["'\[\]]/g, "").trim())
        .filter(Boolean);
    }
  }
  return [];
}

function parseReviews(value: unknown): College["reviews"] {
  if (typeof value === "string") {
    if (!value.trim()) return [];
    try {
      const parsed = JSON.parse(value);
      return parseReviews(parsed);
    } catch {
      return [{ user: "Student", rating: 0, comment: value.trim() }];
    }
  }
  if (Array.isArray(value)) {
    return value
      .filter((review) => typeof review === "object" && review !== null)
      .map((review) => {
        const item = review as Record<string, unknown>;
        return {
          user: String(item.user ?? "Anonymous"),
          rating: toNumber(item.rating),
          comment: String(item.comment ?? ""),
        };
      });
  }
  return [];
}

function normalizeCollege(value: CollegeRow): College {
  const coursesFromPrimaryColumn = parseStringArray(
    getValueByAliases(
      value,
      ["courses", "courses_offered", "course", "course_offered", "course_list"],
      ["course"],
    ),
  );
  const coursesFromSplitColumns =
    coursesFromPrimaryColumn.length > 0
      ? []
      : Object.entries(value)
          .filter(([key, columnValue]) => key.toLowerCase().includes("course") && normalizeText(columnValue))
          .map(([, columnValue]) => normalizeText(columnValue));
  const courses = [...coursesFromPrimaryColumn, ...coursesFromSplitColumns].filter(Boolean);
  const reviews = parseReviews(
    value.reviews ?? value.reviews_json ?? value.review_list ?? value.testimonials,
  );
  const overviewValue =
    getValueByAliases(
    value,
    ["overview", "description", "about", "college_overview", "summary"],
    ["overview"],
  ) ??
    getValueByAliases(value, [], ["description"]) ??
    getValueByAliases(value, [], ["about"]);
  const locationValue = value.location ?? value.city ?? value.state;
  const feesValue = getValueByAliases(
    value,
    ["fees", "annual_fees", "annual_fee", "tuition_fees", "fee"],
    ["fee"],
  );
  const ratingValue = value.rating ?? value.avg_rating;
  const placementValue = value.placement_percentage ?? value.placement_percent ?? value.placements;
  const idValue = value.college_id ?? value.id;
  const nameValue = value.name ?? value.college_name;
  const parsedFees = toNumber(feesValue);
  const parsedOverview = normalizeText(overviewValue);

  return {
    id: String(idValue ?? ""),
    name: String(nameValue ?? "Unnamed College"),
    slug: value.slug,
    location: String(locationValue ?? "N/A"),
    fees: parsedFees,
    rating: toNumber(ratingValue),
    placement_percentage: toNumber(placementValue),
    overview: parsedOverview || "Overview not available.",
    courses,
    reviews,
  };
}

function applyFilters(colleges: College[], filters: CollegeFilters) {
  return colleges.filter((college) => {
    const matchesSearch = filters.search
      ? college.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchesLocation = filters.location ? college.location === filters.location : true;
    const matchesFees = filters.maxFees ? college.fees <= filters.maxFees : true;
    const matchesCourse = filters.course
      ? college.courses.some((course) =>
          course.toLowerCase().includes(filters.course!.toLowerCase()),
        )
      : true;
    return matchesSearch && matchesLocation && matchesFees && matchesCourse;
  });
}

export async function getColleges(filters: CollegeFilters = {}) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("colleges").select("*");
    if (error) throw error;
    const normalizedData = (data ?? [])
      .filter((college): college is CollegeRow => Boolean(college?.id ?? college?.college_id))
      .map((college) => normalizeCollege(college));
    const filteredData = applyFilters(normalizedData, filters);
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 9;
    const start = (page - 1) * limit;
    const paginatedData = filteredData.slice(start, start + limit);

    return { data: paginatedData, count: filteredData.length, fallback: false };
  } catch {
    const filtered = applyFilters(fallbackColleges, filters);
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 9;
    const start = (page - 1) * limit;
    return {
      data: filtered.slice(start, start + limit),
      count: filtered.length,
      fallback: true,
    };
  }
}

export async function getCollegeById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("colleges")
      .select("*")
      .eq("college_id", id)
      .single();
    if (!error && data) {
      return { data: normalizeCollege(data as CollegeRow), fallback: false };
    }

    const { data: idData, error: idError } = await supabase
      .from("colleges")
      .select("*")
      .eq("id", id)
      .single();
    if (idError) throw idError;
    if (!idData?.id && !idData?.college_id) return { data: null, fallback: false };
    return { data: normalizeCollege(idData as CollegeRow), fallback: false };
  } catch {
    return { data: fallbackColleges.find((college) => college.id === id) ?? null, fallback: true };
  }
}
