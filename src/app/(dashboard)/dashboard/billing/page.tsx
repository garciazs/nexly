import { getBillingData } from "@/lib/dashboard/queries";
import { BillingView } from "@/components/dashboard/pages/billing-view";

export default async function BillingPage() {
  const billing = await getBillingData();
  return <BillingView billing={billing} />;
}
