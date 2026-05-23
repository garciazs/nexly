import { getOrgApiKeys } from "@/lib/dashboard/queries";
import { ApiKeysView } from "@/components/dashboard/pages/api-keys-view";

export default async function ApiKeysPage() {
  const keys = await getOrgApiKeys();
  return <ApiKeysView keys={keys} />;
}
