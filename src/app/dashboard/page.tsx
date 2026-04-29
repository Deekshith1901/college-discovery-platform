import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: savedColleges }, { data: savedComparisons }] = await Promise.all([
    supabase.from("saved_colleges").select("*").eq("user_id", user.id),
    supabase.from("saved_comparisons").select("*").eq("user_id", user.id),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>
        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            Logout
          </Button>
        </form>
      </div>
      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Saved Colleges</h2>
        <p className="mt-2 text-sm text-zinc-700">{savedColleges?.length ?? 0} saved items.</p>
      </section>
      <section className="rounded-xl border border-zinc-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Saved Comparisons</h2>
        <p className="mt-2 text-sm text-zinc-700">{savedComparisons?.length ?? 0} saved comparisons.</p>
      </section>
    </div>
  );
}
