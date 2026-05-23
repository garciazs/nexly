import { getBillingData } from "@/lib/dashboard/queries";
import { BillingView } from "@/components/dashboard/pages/billing-view";
import { isAnyStripePlanConfigured } from "@/lib/plans";

export default async function BillingPage() {
  const billing = await getBillingData();
  const stripeEnabled = isAnyStripePlanConfigured();

  return <BillingView billing={billing} stripeEnabled={stripeEnabled} />;
}
