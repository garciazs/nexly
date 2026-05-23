"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 75, damping: 15 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString("pt-BR"));
  const [text, setText] = useState("0");
  useEffect(() => { spring.set(value); const u = display.on("change", setText); return u; }, [value, spring, display]);
  return <motion.span>{text}{suffix}</motion.span>;
}
