"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { PageHeader, PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { ChatMessageRow } from "@/lib/dashboard/queries";
import { cn } from "@/lib/utils";

export function ChatView({ initialMessages }: { initialMessages: ChatMessageRow[] }) {
  const [messages, setMessages] = useState<ChatMessageRow[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;

    setSending(true);
    setDraft("");

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) throw new Error("send failed");

      const msg = (await res.json()) as {
        id: string;
        content: string;
        userName: string;
        time: string;
        self: boolean;
      };

      setMessages((prev) => [
        ...prev,
        {
          id: msg.id,
          content: msg.content,
          userName: msg.userName,
          userInitials: msg.userName.slice(0, 2).toUpperCase(),
          time: msg.time,
          self: true,
        },
      ]);
    } catch {
      setDraft(text);
    } finally {
      setSending(false);
    }
  }

  return (
    <PageShell className="flex h-[calc(100vh-8rem)] flex-col">
      <PageHeader title="Chat" description="Canal do seu workspace" />

      <Card className="glass-card flex min-h-0 flex-1 flex-col">
        <CardHeader className="shrink-0 border-b border-border/50 py-4">
          <CardTitle className="text-base"># geral</CardTitle>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col p-0">
          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <EmptyState
                icon={MessageSquare}
                title="Nenhuma mensagem"
                description="Seja o primeiro a enviar uma mensagem neste workspace."
              />
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-3", m.self && "flex-row-reverse")}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-xs text-primary">
                        {m.userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("max-w-[75%]", m.self && "text-right")}>
                      <p className="text-xs text-muted-foreground">
                        {m.userName} · {m.time}
                      </p>
                      <p
                        className={cn(
                          "mt-1 rounded-2xl px-3 py-2 text-sm",
                          m.self ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}
                      >
                        {m.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="flex shrink-0 gap-2 border-t border-border/50 p-4"
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escreva uma mensagem..."
              disabled={sending}
            />
            <Button type="submit" variant="glow" size="icon" disabled={sending || !draft.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageShell>
  );
}
