import { getAffiliateData, getOrganizationSettings } from "@/lib/dashboard/queries";
import { getTenant } from "@/lib/tenant";
import { AffiliatesView } from "@/components/dashboard/pages/affiliates-view";
import { AFFILIATE_COMMISSION } from "@/lib/constants";
import { canUseAffiliates } from "@/lib/plans";

export default async function AffiliatesPage() {
  const tenant = await getTenant();
  const affiliate = tenant ? await getAffiliateData(tenant.userId) : null;
  const org = await getOrganizationSettings();
  const plan = org?.plan ?? "STARTER";

  return (
    <AffiliatesView
      affiliate={affiliate ?? { code: null, status: null, totalEarnings: 0, conversions: [] }}
      commissionPercent={(AFFILIATE_COMMISSION * 100).toFixed(0)}
      appUrl={process.env.NEXT_PUBLIC_APP_URL ?? ""}
      planAllowsAffiliates={canUseAffiliates(plan)}
      currentPlan={plan}
    />
  );
}
