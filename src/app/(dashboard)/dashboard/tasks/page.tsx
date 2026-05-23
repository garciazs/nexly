import { getDashboardTasks } from "@/lib/dashboard/queries";
import { TasksView } from "@/components/dashboard/pages/tasks-view";

export default async function TasksPage() {
  const tasks = await getDashboardTasks();
  return <TasksView initialTasks={tasks} />;
}
