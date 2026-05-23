import { getDashboardTasks, mergeTasks } from "@/lib/dashboard/queries";
import { TasksView } from "@/components/dashboard/pages/tasks-view";

export default async function TasksPage() {
  const dbTasks = await getDashboardTasks();
  const tasks = mergeTasks(dbTasks);
  return <TasksView initialTasks={tasks} />;
}
