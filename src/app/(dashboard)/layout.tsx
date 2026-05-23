import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 dashboard-mesh" aria-hidden />
      <DashboardSidebar />
      <div className="relative flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
