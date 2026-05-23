import { getAnalyticsData } from "@/lib/dashboard/queries";
import { AnalyticsView } from "@/components/dashboard/pages/analytics-view";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  return <AnalyticsView data={data} />;
}
