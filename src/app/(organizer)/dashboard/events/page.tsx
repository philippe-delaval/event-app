import { CoreUseCasesLive } from "@/core/use-cases";
import EventsView from "./_components/events-view";

export const dynamic = "force-dynamic";

export default async function Events() {
  const events = await CoreUseCasesLive.getAllEvents();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <EventsView events={events} />
    </div>
  );
}

