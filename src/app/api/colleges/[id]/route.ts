import { NextResponse } from "next/server";
import { getCollegeById } from "@/lib/data/colleges";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await getCollegeById(id);
  if (!data.data) return NextResponse.json({ error: "College not found" }, { status: 404 });
  return NextResponse.json(data);
}
