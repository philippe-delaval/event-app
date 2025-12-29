"use client";

import React, { useState } from "react";
import { AppEvent } from "@/core/models/app-event";
import { EventsList } from "./events-list";
import { EventsCalendar } from "./events-calendar";
// Icons could be imported from heroicons but for simplicity using text/css or ensuring lucide-react etc.
// Assuming we might not have icons handy, or using svg directly.

interface EventsViewProps {
  events: AppEvent[];
}

export default function EventsView({ events }: EventsViewProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Événements
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Gérez vos événements via la liste ou le calendrier.
            {/* Toggle UI */}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-4">
             <span className="isolate inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 ${
                  viewMode === "list"
                    ? "bg-primary text-white ring-primary"
                    : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
                }`}
              >
                Liste
              </button>
              <button
                type="button"
                onClick={() => setViewMode("calendar")}
                className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 ${
                  viewMode === "calendar"
                    ? "bg-primary text-white ring-primary"
                    : "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50"
                }`}
              >
                Calendrier
              </button>
            </span>

          <a
            href="/dashboard/events/create"
            className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Créer un événement
          </a>
        </div>
      </div>
      
      {viewMode === "list" ? (
        <EventsList events={events} />
      ) : (
        <EventsCalendar events={events} />
      )}
    </>
  );
}
