"use client";
import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToastStore } from "@/stores/toast-store";

const ToastProvider = ToastPrimitive.Provider;
const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport ref={ref} className={cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className)} {...props} />
));

export function Toaster() {
  const { toasts, removeToast } = useToastStore();
  return (
    <ToastProvider>
      {toasts.map((t) => (
        <ToastPrimitive.Root key={t.id} open onOpenChange={() => removeToast(t.id)} className="glass-card group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg">
          <div>
            <ToastPrimitive.Title className="text-sm font-semibold">{t.title}</ToastPrimitive.Title>
            {t.description && <ToastPrimitive.Description className="text-sm opacity-90">{t.description}</ToastPrimitive.Description>}
          </div>
          <ToastPrimitive.Close><X className="h-4 w-4" /></ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
export { ToastProvider, ToastViewport };
