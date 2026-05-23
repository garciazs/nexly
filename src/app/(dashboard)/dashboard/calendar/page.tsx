import { getCalendarEvents } from "@/lib/dashboard/queries";
import { CalendarView } from "@/components/dashboard/pages/calendar-view";

export default async function CalendarPage() {
  const events = await getCalendarEvents();
  return <CalendarView events={events} />;
}
