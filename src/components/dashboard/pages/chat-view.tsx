"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHAT_MESSAGES } from "@/lib/dashboard/integrations-data";
import { cn } from "@/lib/utils";

type ChatMessage = (typeof CHAT_MESSAGES)[number];

export function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        user: "Você",
        avatar: "UD",
        time,
        content: text,
        self: true,
      },
    ]);
    setDraft("");
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  return (
    <PageShell className="flex min-h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        title="Chat da equipe"
        description="Canal geral · mensagens em tempo real (demo)"
      />

      <Card className="surface-card flex flex-1 flex-col border-border/60">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-base"># geral</CardTitle>
          <p className="text-xs text-muted-foreground">{messages.length} mensagens</p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-0">
          <div
            ref={listRef}
            className="flex max-h-[min(60vh,520px)] flex-1 flex-col gap-4 overflow-y-auto p-4"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i === messages.length - 1 ? 0 : 0, duration: 0.25 }}
                  className={cn(
                    "flex gap-3",
                    msg.self ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar className="h-8 w-8 shrink-0 border border-border/60">
                    <AvatarFallback
                      className={cn(
                        "text-xs",
                        msg.self ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      )}
                    >
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[75%] space-y-1",
                      msg.self ? "items-end text-right" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-baseline gap-2 text-xs text-muted-foreground",
                        msg.self && "flex-row-reverse"
                      )}
                    >
                      <span className="font-medium text-foreground">{msg.user}</span>
                      <span>{msg.time}</span>
                    </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm",
                        msg.self
                          ? "rounded-tr-sm bg-primary text-primary-foreground"
                          : "rounded-tl-sm border border-border/60 bg-muted/50"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form
            onSubmit={sendMessage}
            className="flex gap-2 border-t border-border/40 p-4"
          >
            <Input
              placeholder="Escreva uma mensagem..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="border-border/60 bg-muted/40"
            />
            <Button type="submit" variant="glow" size="icon" disabled={!draft.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageShell>
  );
}
