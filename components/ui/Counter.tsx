"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

type CounterProps = {
  target: number;
  suffix?: string;
  label: string;
};

export default function Counter({ target, suffix = "", label }: CounterProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.4);
  const value = useCountUp(target, isInView);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-3xl md:text-4xl font-black text-white">
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-xs md:text-sm uppercase tracking-wider text-white/60">
        {label}
      </div>
    </div>
  );
}
