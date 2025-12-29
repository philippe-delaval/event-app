import DashboardWidgets from "@/app/(organizer)/dashboard/_component/dashboard";
import { CoreUseCasesLive } from "@/core/use-cases";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const stats = await CoreUseCasesLive.getDashboardStats();

  return (
    <>
      <DashboardWidgets stats={stats} />
    </>
  );
}
