import { useEffect, useState, useRef } from "react";

export function useCountDown(index: number, initialCount: number = -1) {
  const intervalRef = useRef<number>();
  const [countDown, setCountDown] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    console.log("tracker has been changed");
    if (index == -1) {
      return;
    }

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((countDown) => {
          console.log(countDown);
          return countDown - 1;
        });
      }, 1000);
    }

    return cleanUp;
  }, [index, isRunning]);

  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);

  useEffect(() => {
    if (countDown === 0) {
      cleanUp();
    }
  }, [countDown]);

  const cleanUp = () => {
    if (intervalRef.current) {
      setIsRunning(false);
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanUp,
    start: (count?: number) => {
      setCountDown(count ?? initialCount);
      setIsRunning(true);
    },
  };
}
