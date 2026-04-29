"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CollegeFilters() {
  const params = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [location, setLocation] = useState(params.get("location") ?? "");
  const [maxFees, setMaxFees] = useState(params.get("maxFees") ?? "");
  const [course, setCourse] = useState(params.get("course") ?? "");

  const apply = () => {
    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (location) next.set("location", location);
    if (maxFees) next.set("maxFees", maxFees);
    if (course) next.set("course", course);
    router.push(`/?${next.toString()}`);
  };

  return (
    <div className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-5">
      <Input placeholder="Search college name" value={search} onChange={(e) => setSearch(e.target.value)} />
      <Input placeholder="Location (e.g. Delhi)" value={location} onChange={(e) => setLocation(e.target.value)} />
      <Input placeholder="Max fees (e.g. 250000)" type="number" value={maxFees} onChange={(e) => setMaxFees(e.target.value)} />
      <Input placeholder="Course (e.g. CSE)" value={course} onChange={(e) => setCourse(e.target.value)} />
      <Button onClick={apply}>Apply Filters</Button>
    </div>
  );
}
