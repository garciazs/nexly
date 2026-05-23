import { getOrganizationSettings } from "@/lib/dashboard/queries";
import { SettingsView } from "@/components/dashboard/pages/settings-view";

export default async function SettingsPage() {
  const organization = await getOrganizationSettings();
  return <SettingsView organization={organization} />;
}
