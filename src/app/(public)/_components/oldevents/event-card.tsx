import { AppEvent } from "@/core/models/app-event";
import React from "react";

interface EventCardProps {
  event: AppEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.begin_date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-primary">
            {date}
          </p>
          <div className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{event.name}</p>
            <p className="mt-3 text-base text-gray-500">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
