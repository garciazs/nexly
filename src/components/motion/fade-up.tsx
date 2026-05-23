"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export function FadeUp({
  children,
  delay = 0,
  className,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
