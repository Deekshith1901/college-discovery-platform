"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function saveCollegeAction(collegeId: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Please login first." };
  const { error } = await supabase.from("saved_colleges").insert({ user_id: user.id, college_id: collegeId });
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}

export async function saveComparisonAction(collegeIds: string[]) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Please login first." };
  const { error } = await supabase.from("saved_comparisons").insert({
    user_id: user.id,
    college_ids: collegeIds,
  });
  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return { success: true };
}
