import { CompareBuilder } from "@/components/compare/compare-builder";
import { getColleges } from "@/lib/data/colleges";

export default async function ComparePage() {
  const { data } = await getColleges({ limit: 50, page: 1 });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Compare Colleges</h1>
      <p className="text-sm text-zinc-600">Select 2 to 3 colleges and compare side by side.</p>
      <CompareBuilder colleges={data} />
    </div>
  );
}
