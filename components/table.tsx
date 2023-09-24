import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity } from "@/app/types";
import { format } from "@/app/utils";

export default function ActivityTable({ activity }: { activity: Activity }) {
  return (
    <Table>
      <TableCaption className="caption-top text-lg font-bold">
        {activity.name} - started at{" "}
        {new Date(activity.datetime).toLocaleString()}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Entry #</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Started time</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activity.entries.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>{index}</TableCell>
            <TableCell>{entry.desc}</TableCell>
            <TableCell>
              {new Date(entry.datetime).toLocaleTimeString()}
            </TableCell>
            <TableCell className="text-right">{format(entry.time)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-medium"></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
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
