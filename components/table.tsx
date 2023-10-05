import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Activity } from "@/lib/types";
import { format } from "@/lib/utils";
import EntryRow from "@/components/entry";
import { Plus } from "lucide-react";

export default function ActivityTable({
  editable,
  activity,
  setEntryDescription,
  deleteEntry,
  toggleRunning,
  addEntry,
}: {
  editable: boolean;
  activity: Activity;
  setEntryDescription?: (id: number, desc: string) => void;
  deleteEntry?: (id: number) => void;
  toggleRunning?: (id: number) => void;
  addEntry?: () => void;
}) {
  return (
    <Table>
      <TableCaption className="caption-top text-lg font-bold">
        {activity.name} - started at{" "}
        {new Date(activity.datetime).toLocaleString()}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap">Entry #</TableHead>
          <TableHead className="w-full">Description</TableHead>
          <TableHead className="whitespace-nowrap">Started time</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activity.entries.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              {editable ? (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  onEditDesc={(desc) => setEntryDescription!(entry.id, desc)}
                  onDelete={() => deleteEntry!(entry.id)}
                  onPlayPause={() => toggleRunning!(entry.id)}
                  last={index === activity.entries.length - 1}
                />
              ) : (
                entry.desc
              )}
            </TableCell>
            <TableCell>
              {new Date(entry.datetime).toLocaleTimeString()}
            </TableCell>
            <TableCell className="text-right">{format(entry.time)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3}>
            {editable && (
              <Button variant="outline" onClick={addEntry}>
                <Plus className="mr-2 h-4 w-4" /> New entry
              </Button>
            )}
          </TableCell>
          <TableCell className="text-right font-bold">
            TOTAL{" "}
            {format(
              activity.entries.reduce((acc, entry) => acc + entry.time, 0),
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
