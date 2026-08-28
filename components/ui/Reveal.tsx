"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
