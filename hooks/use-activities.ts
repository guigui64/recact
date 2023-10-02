import { useCallback, useEffect } from "react";
import { produce } from "immer";

import { Activity } from "@/lib/types";
import useLocalStorage from "./use-local-storage";

export default function useActivities() {
  const [history, setHistory] = useLocalStorage<Activity[]>("history", []);
  const [currentId, setCurrentId] = useLocalStorage<number>("currentId", -1);

  const current = history?.find((activity) => activity.id === currentId);

  const tick = useCallback(() => {
    setHistory(
      produce(history, (draftHistory) => {
        const currentActivity = draftHistory.find(
          (activity) => activity.id === currentId,
        );
        if (currentActivity && currentActivity.entries.length > 0) {
          currentActivity.entries = produce(
            currentActivity.entries,
            (draftEntries) => {
              const lastEntry = draftEntries[draftEntries.length - 1];
              lastEntry && lastEntry.running && lastEntry.time++;
            },
          );
        }
      }),
    );
  }, [currentId, history, setHistory]);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const createActivity = useCallback(() => {
    const id =
      history.length === 0
        ? 1
        : Math.max(...history.map((activity) => activity.id)) + 1;
    setCurrentId(id);
    setHistory([
      ...history,
      {
        id,
        name: "",
        entries: [],
        datetime: Date.now(),
      },
    ]);
  }, [history, setCurrentId, setHistory]);

  const deleteCurrent = useCallback(() => {
    setCurrentId(
      history.find((activity) => activity.id !== currentId)?.id || -1,
    );
    setHistory(history.filter((activity) => activity.id !== currentId));
  }, [currentId, history, setCurrentId, setHistory]);

  const setCurrentName = useCallback(
    (name: string) => {
      setHistory(
        produce(history, (draftHistory) => {
          const currentActivity = draftHistory.find(
            (activity) => activity.id === currentId,
          );
          if (currentActivity) {
            currentActivity.name = name;
          }
        }),
      );
    },
    [currentId, history, setHistory],
  );

  const setEntryDescription = useCallback(
    (entryId: number, description: string) => {
      setHistory(
        produce(history, (draftHistory) => {
          const currentActivity = draftHistory.find(
            (activity) => activity.id === currentId,
          );
          if (currentActivity) {
            currentActivity.entries = produce(
              currentActivity.entries,
              (draftEntries) => {
                const currentEntry = draftEntries.find(
                  (entry) => entry.id === entryId,
                );
                if (currentEntry) {
                  currentEntry.desc = description;
                }
              },
            );
          }
        }),
      );
    },
    [currentId, history, setHistory],
  );

  const deleteEntry = useCallback(
    (entryId: number) => {
      setHistory(
        produce(history, (draftHistory) => {
          const currentActivity = draftHistory.find(
            (activity) => activity.id === currentId,
          );
          if (currentActivity) {
            currentActivity.entries = produce(
              currentActivity.entries,
              (draftEntries) => {
                const currentEntryIndex = draftEntries.findIndex(
                  (entry) => entry.id === entryId,
                );
                if (currentEntryIndex !== -1) {
                  draftEntries.splice(currentEntryIndex, 1);
                }
              },
            );
          }
        }),
      );
    },
    [currentId, history, setHistory],
  );

  const toggleRunning = useCallback(
    (entryId: number) => {
      setHistory(
        produce(history, (draftHistory) => {
          const currentActivity = draftHistory.find(
            (activity) => activity.id === currentId,
          );
          if (currentActivity) {
            currentActivity.entries = produce(
              currentActivity.entries,
              (draftEntries) => {
                const currentEntry = draftEntries.find(
                  (entry) => entry.id === entryId,
                );
                if (currentEntry) {
                  currentEntry.running = !currentEntry.running;
                }
              },
            );
          }
        }),
      );
    },
    [currentId, history, setHistory],
  );

  const addEntry = useCallback(() => {
    setHistory(
      produce(history, (draftHistory) => {
        const currentActivity = draftHistory.find(
          (activity) => activity.id === currentId,
        );
        if (currentActivity) {
          currentActivity.entries.forEach((entry) => (entry.running = false));
          currentActivity.entries.push({
            id:
              currentActivity.entries.length === 0
                ? 1
                : Math.max(...currentActivity.entries.map((e) => e.id)) + 1,
            desc: "",
            time: 0,
            datetime: Date.now(),
            running: true,
          });
        }
      }),
    );
  }, [currentId, history, setHistory]);

  return {
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
  };
}
