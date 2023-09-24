"use client";

import { useEffect, useState } from "react";
import { Activity, Entry } from "./types";
import { format } from "./utils";
import { H1, H2, H3 } from "@/components/ui/typo";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Pause, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import Table from "@/components/table";
import History from "@/components/history";
import EntryRow from "@/components/entry";

export default function Home() {
  const [history, setHistory] = useState<Activity[]>();
  useEffect(() => {
    const localHistory = localStorage.getItem("history");
    if (localHistory) {
      setHistory(JSON.parse(localHistory));
    }
  }, []);
  useEffect(() => {
    history && localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const [currentId, setCurrentId] = useState<number>(-1);
  useEffect(() => {
    const localCurrentId = localStorage.getItem("currentId");
    if (localCurrentId) {
      setCurrentId(JSON.parse(localCurrentId));
    }
  }, []);
  useEffect(() => {
    currentId >= 0 &&
      localStorage.setItem("currentId", JSON.stringify(currentId));
  }, [currentId]);

  const current = history?.find((activity) => activity.id === currentId);

  useEffect(() => {
    if (history === undefined) return;
    const id = setInterval(() => {
      setHistory(
        history!.map((activity) => {
          if (activity.id === currentId && activity.entries.length > 0) {
            const lastEntry = activity.entries[activity.entries.length - 1];
            lastEntry && lastEntry.running && lastEntry.time++;
            return {
              ...activity,
              entries: [...activity.entries.slice(0, -1), lastEntry],
            };
          }
          return activity;
        }),
      );
    }, 1000);
    return () => clearInterval(id);
  }, [currentId, history]);

  return (
    <main className="mx-4">
      <H1>Recact</H1>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            const id =
              history === undefined || history.length === 0
                ? 1
                : Math.max(...history.map((activity) => activity.id)) + 1;
            setCurrentId(id);
            setHistory([
              ...(history || []),
              {
                id,
                name: "",
                entries: [],
                datetime: Date.now(),
              },
            ]);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Create a new activity
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setCurrentId(
              history?.find((activity) => activity.id !== currentId)?.id || -1,
            );
            setHistory(
              history?.filter((activity) => activity.id !== currentId),
            );
          }}
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
              onChange={(event) =>
                setHistory(
                  history!.map((activity) => {
                    if (activity.id === current.id) {
                      return {
                        ...activity,
                        name: event.target.value,
                      };
                    }
                    return activity;
                  }),
                )
              }
            />
            {current.entries.map((entry, index) => {
              return (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  onEditDesc={(desc) => {
                    setHistory(
                      history!.map((activity) => {
                        if (activity.id === current.id) {
                          return {
                            ...activity,
                            entries: activity.entries.map((e) => {
                              if (e.id === entry.id) {
                                return {
                                  ...e,
                                  desc,
                                };
                              }
                              return e;
                            }),
                          };
                        }
                        return activity;
                      }),
                    );
                  }}
                  onDelete={() => {
                    setHistory(
                      history!.map((activity) => {
                        if (activity.id === current.id) {
                          return {
                            ...activity,
                            entries: activity.entries.filter(
                              (e) => e.id !== entry.id,
                            ),
                          };
                        }
                        return activity;
                      }),
                    );
                  }}
                  onPlayPause={() => {
                    setHistory(
                      history!.map((activity) => {
                        if (activity.id === currentId) {
                          return {
                            ...activity,
                            entries: activity.entries.map((e) => {
                              if (e.id === entry.id) {
                                return {
                                  ...e,
                                  running: !e.running,
                                };
                              }
                              return e;
                            }),
                          };
                        }
                        return activity;
                      }),
                    );
                  }}
                  last={index === current.entries.length - 1}
                />
              );
            })}
            <Button
              onClick={() => {
                const entry = {
                  id:
                    current.entries.length === 0
                      ? 1
                      : Math.max(...current.entries.map((e) => e.id)) + 1,
                  desc: "",
                  time: 0,
                  datetime: Date.now(),
                } as Entry;
                setHistory(
                  history!.map((activity) => {
                    if (activity.id === current.id) {
                      return {
                        ...activity,
                        entries: [
                          ...activity.entries.map((e) => ({
                            ...e,
                            running: false,
                          })),
                          { ...entry, running: true },
                        ],
                      };
                    }
                    return activity;
                  }),
                );
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> New entry
            </Button>
            {current.entries.length > 0 && <Table activity={current} />}
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
