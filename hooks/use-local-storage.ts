import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(key) || JSON.stringify(defaultValue),
      ) as T;
    } catch (_) {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const deleteItem = useCallback(() => localStorage.removeItem(key), [key]);

  return [value, setValue, deleteItem] as [
    typeof value,
    typeof setValue,
    typeof deleteItem,
  ];
}
