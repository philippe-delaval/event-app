import { AppEventsRepository } from "../../repositories/app-events.repository";
import { RegistrationsRepository } from "../../repositories/registrations.repository";

import { AppEvent } from "../../models/app-event";

export interface DashboardStats {
  nextEvent: AppEvent | null;
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
  recentRegistrations: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    event_name: string;
  }[];
}

export async function getDashboardStatsUseCase(dependencies: {
  appEventsRepository: AppEventsRepository;
  registrationsRepository: RegistrationsRepository;
}): Promise<DashboardStats> {
  const [
    nextEvent,
    totalEvents,
    totalRegistrations,
    totalRevenue,
    recentRegistrations,
  ] = await Promise.all([
    dependencies.appEventsRepository.findNextAppEvent(),
    dependencies.appEventsRepository.countTotalEvents(),
    dependencies.registrationsRepository.countTotalRegistrations(),
    dependencies.registrationsRepository.calculateTotalRevenue(),
    dependencies.registrationsRepository.getRecentRegistrations(5),
  ]);

  return {
    nextEvent,
    totalEvents,
    totalRegistrations,
    totalRevenue,
    recentRegistrations,
  };
}
