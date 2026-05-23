import { getTeamMembers } from "@/lib/dashboard/queries";
import { TeamView } from "@/components/dashboard/pages/team-view";

export default async function TeamPage() {
  const members = await getTeamMembers();
  return <TeamView members={members} />;
}
