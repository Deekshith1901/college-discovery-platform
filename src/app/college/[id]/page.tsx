import { notFound } from "next/navigation";
import { getCollegeById } from "@/lib/data/colleges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SaveCollegeButton } from "@/components/college/save-college-button";

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getCollegeById(id);
  if (!data) notFound();
  const feesValue = Number(data.fees);
  const formattedFees = Number.isFinite(feesValue) ? feesValue.toLocaleString() : "N/A";
  const courses = Array.isArray(data.courses) ? data.courses : [];
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];

  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="mt-2 text-zinc-600">{data.location}</p>
        <p className="mt-2 text-sm text-zinc-700">Fees: INR {formattedFees}</p>
        <div className="mt-4">
          <SaveCollegeButton collegeId={data.id} />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
              {courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-700">Placement %: {data.placement_percentage}%</p>
            <p className="text-sm text-zinc-700">Average rating: {data.rating}/5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {reviews.map((review, idx) => (
              <p key={`${review.user}-${idx}`} className="text-sm text-zinc-700">
                <span className="font-medium">{review.user}</span> ({review.rating}/5): {review.comment}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 text-zinc-700">{data.overview}</p>
      </section>
    </div>
  );
}
