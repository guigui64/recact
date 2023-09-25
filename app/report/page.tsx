"use client";

import Table from "@/components/table";
import { useSearchParams } from "next/navigation";
import { Activity } from "../types";
import { H1 } from "@/components/ui/typo";
import Link from "next/link";

export default function Report() {
  const searchParams = useSearchParams();
  const activity = JSON.parse(atob(searchParams.get("activity")!)) as Activity;
  return (
    <main className="mx-4">
      <Link href="/">
        <H1>Recact</H1>
      </Link>
      <Table activity={activity} />
    </main>
  );
}
