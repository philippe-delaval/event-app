"use client";

import React, { useState, useTransition } from "react";
import { RecentRegistration } from "@/core/repositories/registrations.repository";
import { updateAttendeeStatusAction } from "../update-status.action";

interface ParticipantsListProps {
  participants: (RecentRegistration & { status: string; event_id: number; attendee_id: number })[];
}

export default function ParticipantsList({ participants: initialParticipants }: ParticipantsListProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const [participants, setParticipants] = useState(initialParticipants);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (eventId: number, attendeeId: number, newStatus: string) => {
    // Optimistic update
    setParticipants((prev) =>
        prev.map((p) =>
          p.event_id === eventId && p.attendee_id === attendeeId
            ? { ...p, status: newStatus }
            : p
        )
      );

    startTransition(async () => {
      await updateAttendeeStatusAction(eventId, attendeeId, newStatus);
    });
  };

  const filteredParticipants = participants.filter((p) => {
    if (filter === "ALL") return true;
    return p.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-50 text-green-700 ring-green-600/20";
      case "PENDING":
        return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
      case "CANCELLED":
        return "bg-red-50 text-red-700 ring-red-600/20";
       case "ATTENDED":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-500/10";
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Participants
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestion des inscriptions et des statuts des invités.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="PENDING">En attente (PENDING)</option>
            <option value="CONFIRMED">Confirmé (CONFIRMED)</option>
            <option value="ATTENDED">Présent (ATTENDED)</option>
            <option value="CANCELLED">Annulé (CANCELLED)</option>
          </select>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Événement
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredParticipants.map((person) => (
                    <tr key={`${person.event_id}-${person.attendee_id}`}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {person.first_name} {person.last_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.event_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <select
                          disabled={isPending}
                          value={person.status}
                          onChange={(e) =>
                            handleStatusChange(
                              person.event_id,
                              person.attendee_id,
                              e.target.value
                            )
                          }
                          className={`block w-full max-w-[140px] rounded-md border-0 py-1.5 pl-3 pr-8 text-xs font-medium ring-1 ring-inset focus:ring-2 focus:ring-primary sm:text-xs sm:leading-6 ${getStatusColor(
                            person.status
                          )}`}
                        >
                          <option value="PENDING">En attente</option>
                          <option value="CONFIRMED">Confirmé</option>
                          <option value="ATTENDED">Présent</option>
                          <option value="CANCELLED">Annulé</option>
                        </select>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredParticipants.length === 0 && (
                  <div className="p-4 text-center text-sm text-gray-500">Aucun participant trouvé.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
