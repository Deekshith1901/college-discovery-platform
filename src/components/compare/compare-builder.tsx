"use client";

import { useMemo, useState } from "react";
import type { College } from "@/types/college";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { saveComparisonAction } from "@/app/actions/saved";

export function CompareBuilder({ colleges }: { colleges: College[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => colleges.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [colleges, query],
  );
  const selectedColleges = colleges.filter((c) => selected.includes(c.id));

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : prev.length >= 3 ? prev : [...prev, id],
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <Input placeholder="Search colleges to compare" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="mt-3 flex flex-wrap gap-2">
          {filtered.slice(0, 10).map((college) => (
            <Button key={college.id} variant={selected.includes(college.id) ? "default" : "outline"} onClick={() => toggle(college.id)}>
              {college.name}
            </Button>
          ))}
        </div>
      </div>

      {selectedColleges.length >= 2 && (
        <div className="space-y-3 overflow-x-auto rounded-xl border border-zinc-200 bg-white p-3">
          <Button onClick={() => saveComparisonAction(selected)} className="w-full sm:w-auto">
            Save Comparison
          </Button>
          <Table>
            <thead>
              <TableRow>
                <TableHead>Metric</TableHead>
                {selectedColleges.map((college) => (
                  <TableHead key={college.id}>{college.name}</TableHead>
                ))}
              </TableRow>
            </thead>
            <tbody>
              <TableRow><TableCell>Fees</TableCell>{selectedColleges.map((c) => <TableCell key={c.id}>{c.fees}</TableCell>)}</TableRow>
              <TableRow><TableCell>Placement %</TableCell>{selectedColleges.map((c) => <TableCell key={c.id}>{c.placement_percentage}%</TableCell>)}</TableRow>
              <TableRow><TableCell>Rating</TableCell>{selectedColleges.map((c) => <TableCell key={c.id}>{c.rating}</TableCell>)}</TableRow>
              <TableRow><TableCell>Location</TableCell>{selectedColleges.map((c) => <TableCell key={c.id}>{c.location}</TableCell>)}</TableRow>
              <TableRow><TableCell>Courses</TableCell>{selectedColleges.map((c) => <TableCell key={c.id}>{c.courses.join(", ")}</TableCell>)}</TableRow>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
