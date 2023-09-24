import { Entry } from "@/app/types";
import { format } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Pause, Play } from "lucide-react";

export default function Entry({
  entry,
  onEditDesc,
  onDelete,
  onPlayPause,
  last,
}: {
  entry: Entry;
  onEditDesc: (desc: string) => void;
  onDelete: () => void;
  onPlayPause: () => void;
  last: boolean;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Input
        type="text"
        className="w-96"
        placeholder="Entry description"
        value={entry.desc}
        onChange={(event) => {
          onEditDesc(event.target.value);
        }}
      />
      <Button
        variant="outline"
        className="text-red-500 border-red-500 dark:text-red-700 dark:border-red-700"
        onClick={onDelete}
      >
        <Trash className="h-4 w-4" />
      </Button>
      {last && (
        <Button variant="outline" onClick={onPlayPause}>
          {entry.running ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
