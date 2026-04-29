import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fallbackColleges } from "@/lib/data/fallback";
import type { College, CollegeFilters } from "@/types/college";

function normalizeCollege(value: Partial<College> & { id: string }): College {
  const courses = Array.isArray(value.courses)
    ? value.courses.filter((course): course is string => typeof course === "string")
    : [];
  const reviews = Array.isArray(value.reviews)
    ? value.reviews.filter(
        (review): review is { user: string; rating: number; comment: string } =>
          typeof review?.user === "string" &&
          typeof review?.comment === "string" &&
          Number.isFinite(Number(review?.rating)),
      )
    : [];

  return {
    id: value.id,
    name: value.name ?? "Unnamed College",
    slug: value.slug,
    location: value.location ?? "N/A",
    fees: Number(value.fees) || 0,
    rating: Number(value.rating) || 0,
    placement_percentage: Number(value.placement_percentage) || 0,
    overview: value.overview ?? "Overview not available.",
    courses,
    reviews: reviews.map((review) => ({ ...review, rating: Number(review.rating) })),
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
    let query = supabase.from("colleges").select("*", { count: "exact" });

    if (filters.search) query = query.ilike("name", `%${filters.search}%`);
    if (filters.location) query = query.eq("location", filters.location);
    if (filters.maxFees) query = query.lte("fees", filters.maxFees);
    if (filters.course) query = query.contains("courses", [filters.course]);

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 9;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;
    const normalizedData = (data ?? [])
      .filter((college): college is Partial<College> & { id: string } => Boolean(college?.id))
      .map((college) => normalizeCollege(college));
    return { data: normalizedData, count: count ?? 0, fallback: false };
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
    const { data, error } = await supabase.from("colleges").select("*").eq("id", id).single();
    if (error) throw error;
    if (!data?.id) return { data: null, fallback: false };
    return { data: normalizeCollege(data as Partial<College> & { id: string }), fallback: false };
  } catch {
    return { data: fallbackColleges.find((college) => college.id === id) ?? null, fallback: true };
  }
}
