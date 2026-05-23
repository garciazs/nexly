import Link from "next/link";
import { Logo } from "@/components/shared/logo";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/users", label: "Usuários" },
  { href: "/admin/subscriptions", label: "Assinaturas" },
  { href: "/admin/affiliates", label: "Afiliados" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/feature-flags", label: "Feature Flags" },
  { href: "/admin/logs", label: "Logs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4 glass">
        <Logo />
        <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider">Admin</p>
        <nav className="mt-6 space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
