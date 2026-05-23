"use client";

import { cn } from "@/lib/utils";

export function InfiniteMarquee({
  items,
  speed = 40,
  className,
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
