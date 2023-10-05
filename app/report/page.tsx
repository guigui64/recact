"use client";

import Table from "@/components/table";
import { useSearchParams } from "next/navigation";
import { Activity } from "../../lib/types";
import useHydrated from "@/hooks/use-mounted";

export default function Report() {
  const hydrated = useHydrated();
  const searchParams = useSearchParams();
  const activity = JSON.parse(atob(searchParams.get("activity")!)) as Activity;
  if (!hydrated) return null;
  return (
    <section>
      <Table editable={false} activity={activity} />
    </section>
  );
}
