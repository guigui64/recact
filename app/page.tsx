"use client";

import { H1, H2 } from "@/components/ui/typo";
import { Button } from "@/components/ui/button";
import { Trash, Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import Table from "@/components/table";
import History from "@/components/history";
import EntryRow from "@/components/entry";
import Link from "next/link";
import useActivities from "@/hooks/use-activities";

export default function Home() {
  const {
    history,
    currentId,
    setCurrentId,
    current,
    createActivity,
    deleteCurrent,
    setCurrentName,
    setEntryDescription,
    deleteEntry,
    toggleRunning,
    addEntry,
  } = useActivities();
  return (
    <main className="mx-4">
      <H1>Recact</H1>
      <div className="flex gap-2">
        <Button onClick={createActivity}>
          <Plus className="mr-2 h-4 w-4" /> Create a new activity
        </Button>
        <Button
          variant="destructive"
          disabled={history.length === 0}
          onClick={deleteCurrent}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete current activity
        </Button>
      </div>
      {current && (
        <>
          <H2>Current activity</H2>
          <div className="flex flex-col items-start gap-2">
            <Input
              type="text"
              placeholder="Activity name"
              value={current.name}
              onChange={(event) => setCurrentName(event.target.value)}
            />
            {current.entries.map((entry, index) => {
              return (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  onEditDesc={(desc) => setEntryDescription(entry.id, desc)}
                  onDelete={() => deleteEntry(entry.id)}
                  onPlayPause={() => toggleRunning(entry.id)}
                  last={index === current.entries.length - 1}
                />
              );
            })}
            <Button onClick={addEntry}>
              <Plus className="mr-2 h-4 w-4" /> New entry
            </Button>
            {current.entries.length > 0 && <Table activity={current} />}
            {current.entries.length > 0 && (
              <Button asChild>
                <Link
                  href={`/report?activity=${btoa(JSON.stringify(current))}`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Open and share report
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
      <H2>History</H2>
      {history && (
        <History
          history={history}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      )}
    </main>
  );
}
