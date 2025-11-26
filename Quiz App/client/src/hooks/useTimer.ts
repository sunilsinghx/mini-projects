import { useEffect, useState } from "react";

export function useTimer(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return remaining;
}
