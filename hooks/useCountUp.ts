"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let start: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, target, duration]);

  return value;
}
