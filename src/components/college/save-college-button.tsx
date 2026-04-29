"use client";

import { useTransition } from "react";
import { saveCollegeAction } from "@/app/actions/saved";
import { Button } from "@/components/ui/button";

export function SaveCollegeButton({ collegeId }: { collegeId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await saveCollegeAction(collegeId);
        })
      }
      disabled={pending}
    >
      {pending ? "Saving..." : "Save College"}
    </Button>
  );
}
