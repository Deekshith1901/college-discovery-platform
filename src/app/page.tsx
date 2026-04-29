import { CollegeCard } from "@/components/college/college-card";
import { CollegeFilters } from "@/components/college/filters";
import { getColleges } from "@/lib/data/colleges";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const search = typeof params.search === "string" ? params.search : undefined;
  const location = typeof params.location === "string" ? params.location : undefined;
  const course = typeof params.course === "string" ? params.course : undefined;
  const maxFees =
    typeof params.maxFees === "string" && params.maxFees ? Number(params.maxFees) : undefined;
  const { data, count, fallback } = await getColleges({ search, location, course, maxFees, page, limit: 9 });
  const totalPages = Math.max(1, Math.ceil(count / 9));

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white">
        <h1 className="text-3xl font-bold">Find Your Best-Fit College</h1>
        <p className="mt-2 max-w-2xl text-blue-100">
          Discover, compare, and shortlist colleges with placement, fees, and course insights.
        </p>
      </section>
      {fallback && <p className="text-sm text-amber-700">Showing fallback data. Connect Supabase for live data.</p>}
      <CollegeFilters />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </section>
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-600">
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Link href={`/?page=${Math.max(1, page - 1)}`}>
            <Button variant="outline" disabled={page <= 1}>
              Previous
            </Button>
          </Link>
          <Link href={`/?page=${Math.min(totalPages, page + 1)}`}>
            <Button variant="outline" disabled={page >= totalPages}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
