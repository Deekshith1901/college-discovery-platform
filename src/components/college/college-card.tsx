import Link from "next/link";
import type { College } from "@/types/college";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CollegeCard({ college }: { college: College }) {
  const feesValue = Number(college.fees);
  const formattedFees = Number.isFinite(feesValue) ? feesValue.toLocaleString() : "N/A";

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{college.name}</CardTitle>
        <p className="text-sm text-zinc-600">{college.location}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge>Fees: INR {formattedFees}</Badge>
          <Badge className="bg-amber-50 text-amber-700">Rating: {college.rating}/5</Badge>
        </div>
        <Link href={`/college/${college.id}`} className="text-sm font-medium text-blue-700">
          View details →
        </Link>
      </CardContent>
    </Card>
  );
}
