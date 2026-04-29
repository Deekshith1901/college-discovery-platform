import { NextResponse } from "next/server";
import { getColleges } from "@/lib/data/colleges";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? undefined;
  const location = searchParams.get("location") ?? undefined;
  const course = searchParams.get("course") ?? undefined;
  const maxFees = searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : undefined;
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "9");

  const data = await getColleges({ search, location, course, maxFees, page, limit });
  return NextResponse.json(data);
}
