import { CoreUseCasesLive } from "@/core/use-cases";
import EventCard from "../_components/oldevents/event-card";

export const dynamic = "force-dynamic";

export default async function OldEvents() {
  const pastEvents = await CoreUseCasesLive.getPastAppEvents();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Anciennes éditions
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Retrouvez ici l&apos;historique de nos événements passés.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {pastEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

