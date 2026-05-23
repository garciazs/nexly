import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />
        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/pricing">Preços</Link>
          <Link href="/login">Entrar</Link>
          <Link href="#">Privacidade</Link>
          <Link href="#">Termos</Link>
        </nav>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Nexly. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
