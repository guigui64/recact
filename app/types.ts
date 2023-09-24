export type Entry = {
  id: number;
  time: number;
  desc: string;
  running: boolean;
  datetime: number;
};

export type Activity = {
  id: number;
  name: string;
  entries: Entry[];
  datetime: number;
};

export function total(activity: Activity) {
  return activity.entries.reduce((acc, entry) => acc + entry.time, 0);
}
