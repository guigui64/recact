"use client";

import Table from "@/components/table";
import { useSearchParams } from "next/navigation";
import { Activity } from "../../lib/types";
import { H1 } from "@/components/ui/typo";
import Link from "next/link";

export default function Report() {
  const searchParams = useSearchParams();
  const activity = JSON.parse(atob(searchParams.get("activity")!)) as Activity;
  return (
    <main className="mx-4">
      <Link href="/" className="hover:text-red-500">
        <H1>Recact</H1>
      </Link>
      <Table activity={activity} />
    </main>
  );
}
