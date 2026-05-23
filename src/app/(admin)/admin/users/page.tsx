import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
  { name: "Ana Silva", email: "ana@empresa.com", plan: "PRO", role: "USER" },
  { name: "Carlos Mendes", email: "carlos@startup.io", plan: "BUSINESS", role: "ADMIN" },
  { name: "Demo User", email: "demo@nexly.app", plan: "PRO", role: "USER" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
      <Card className="glass-card">
        <CardHeader><CardTitle>Usuários ({mockUsers.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUsers.map((u) => (
              <div key={u.email} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{u.plan}</Badge>
                  <Badge>{u.role}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
