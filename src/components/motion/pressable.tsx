"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Pressable({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={springSnappy}
      {...props}
    >
      {children}
    </motion.div>
  );
}
