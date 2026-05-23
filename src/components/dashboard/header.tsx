"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useUIStore } from "@/stores/ui-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pressable } from "@/components/motion/pressable";

export function DashboardHeader() {
  const { data: session } = useSession();
  const { toggleSidebar } = useUIStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar..."
          className="h-9 border-border/60 bg-muted/50 pl-9 transition-colors focus:bg-background"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Pressable>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <motion.span
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
        </Pressable>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent transition-all hover:ring-primary/20">
              <Avatar className="h-9 w-9">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback className="bg-primary/15 text-primary">
                  {session?.user?.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
              {session?.user?.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
