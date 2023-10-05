"use client";

import { useState } from "react";
import { Trash, Plus, Clipboard, ExternalLink } from "lucide-react";
import { H2 } from "@/components/ui/typo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Table from "@/components/table";
import History from "@/components/history";
import useActivities from "@/hooks/use-activities";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import useHydrated from "@/hooks/use-mounted";
import { ToastAction } from "@/components/ui/toast";

export default function Home() {
  const hydrated = useHydrated();
  const [editable, setEditable] = useState(true);
  const { toast } = useToast();
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
    pause,
  } = useActivities();
  if (!hydrated) return null;
  return (
    <section>
      <div className="flex gap-2">
        <Button onClick={createActivity}>
          <Plus className="mr-2 h-4 w-4" /> Create a new activity
        </Button>
        <Button
          variant="destructive"
          disabled={!hydrated || history.length === 0}
          onClick={deleteCurrent}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete current activity
        </Button>
        {current && current.entries.length > 0 && (
          <Button
            onClick={() => {
              const url =
                window.location +
                `report?activity=${btoa(JSON.stringify(current))}`;
              navigator.clipboard.writeText(url);
              toast({
                title: "URL copied to clipboard",
                action: (
                  <ToastAction
                    altText="Open link in a new page"
                    onClick={() => window.open(url)}
                  >
                    <ExternalLink />
                  </ToastAction>
                ),
              });
            }}
          >
            <Clipboard className="mr-2 h-4 w-4" />
            Get report link
          </Button>
        )}
      </div>
      {current && (
        <>
          <H2>Current activity</H2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                className="grow"
                placeholder="Activity name"
                value={current.name}
                onChange={(event) => setCurrentName(event.target.value)}
              />
              <div className="flex items-center space-x-2">
                <Switch
                  id="editable"
                  checked={editable}
                  onCheckedChange={(c) => {
                    setEditable(c);
                    pause();
                  }}
                />
                <Label htmlFor="editable" className="whitespace-nowrap">
                  Enable editing
                </Label>
              </div>
            </div>
            <Table
              editable={editable}
              activity={current}
              setEntryDescription={setEntryDescription}
              deleteEntry={deleteEntry}
              toggleRunning={toggleRunning}
              addEntry={addEntry}
            />
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
    </section>
  );
}
