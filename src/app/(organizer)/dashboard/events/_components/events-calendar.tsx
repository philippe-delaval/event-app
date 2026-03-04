import { AppEvent } from "@/core/models/app-event";
import React from "react";

interface EventsCalendarProps {
  events: AppEvent[];
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ events }) => {
  // Simple "Agenda" view: Group by month or just a grid of cards for now
  // Real calendar grid is complex without a library, so we'll start with a Card Grid which acts as a "Visual" view
  // mimicking an "Agenda" of cards.

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {event.name}
                </h3>
                <span
                  className={`inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    event.status === "PUBLISHED"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                {event.location || "Lieu non défini"}
              </p>
            </div>
            {/* <img // Removed img for Image later if we had url
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src={event.image_url}
              alt=""
            /> */}
             <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                {new Date(event.begin_date).getDate()}
             </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <span className="text-gray-500 font-normal">
                    {new Date(event.begin_date).toLocaleDateString("fr-FR", { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
               <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                   {event.price ? <span className="text-revenue">{event.price} €</span> : "Gratuit"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
