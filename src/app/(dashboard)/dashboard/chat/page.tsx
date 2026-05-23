import { getOrgChatMessages } from "@/lib/dashboard/queries";
import { getTenant } from "@/lib/tenant";
import { ChatView } from "@/components/dashboard/pages/chat-view";

export default async function ChatPage() {
  const tenant = await getTenant();
  const messages = tenant ? await getOrgChatMessages(tenant.userId) : [];
  return <ChatView initialMessages={messages} />;
}
