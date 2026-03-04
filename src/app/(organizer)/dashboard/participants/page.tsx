import { CoreUseCasesLive } from "@/core/use-cases";
import ParticipantsList from "./_components/participants-list";

export const dynamic = "force-dynamic";

export default async function ParticipantsPage() {
  const participants = await CoreUseCasesLive.getParticipants();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ParticipantsList participants={participants} />
    </div>
  );
}
