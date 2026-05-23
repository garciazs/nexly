"use client";
export function GradientBg() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[120px] animate-glow" />
    </div>
  );
}
