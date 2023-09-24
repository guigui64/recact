import { Activity } from "@/app/types";

export default function History({
  history,
  currentId,
  setCurrentId,
}: {
  history: Activity[];
  currentId: number;
  setCurrentId: (id: number) => void;
}) {
  return (
    <ul>
      {history.map((activity) => {
        const title = `${activity.name} - ${new Date(
          activity.datetime,
        ).toLocaleString()}`;
        return activity.id === currentId ? (
          <li key={activity.id} className="font-bold">
            {title}
          </li>
        ) : (
          <li
            key={activity.id}
            className="underline hover:cursor-pointer"
            onClick={() => {
              setCurrentId(activity.id);
            }}
          >
            {title}
          </li>
        );
      })}
    </ul>
  );
}
