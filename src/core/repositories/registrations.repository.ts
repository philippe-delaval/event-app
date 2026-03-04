import { Knex } from "knex";
import { Attendee } from "../models/attendee";

export interface RecentRegistration {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  event_name: string;
}

export class RegistrationsRepository {
  constructor(private readonly knex: Knex) {}

  async add(fields: {
    event_id: number;
    attendee_id: number;
    confirmation_token: string;
  }): Promise<void> {
    await this.knex("registrations").insert(fields);
  }

  async confirmRegistration(confirmationToken: string): Promise<void> {
    await this.knex("registrations")
      .where({
        confirmation_token: confirmationToken,
      })
      .update({
        confirmed: 1,
      });
  }

  async getAttendeeByConfirmationToken(
    confirmationToken: string,
  ): Promise<Attendee> {
    const attendeeResult = await this.knex("registrations")
      .join("attendees", "attendees.id", "=", "registrations.attendee_id")
      .where({
        "registrations.confirmation_token": confirmationToken,
      })
      .select("attendees.*");

    return attendeeResult[0];
  }

  async countTotalRegistrations(): Promise<number> {
    console.log("Counting registrations...");
    const result = await this.knex("registrations").count("event_id as count").first();
    return parseInt(result?.count?.toString() || "0", 10);
  }

  async countRegistrationsForEvent(eventId: number): Promise<number> {
    const result = await this.knex("registrations")
      .count("event_id as count")
      .where({ event_id: eventId })
      .first();
    return parseInt(result?.count?.toString() || "0", 10);
  }

  async calculateTotalRevenue(): Promise<number> {
    const result = await this.knex("registrations")
      .join("events", "events.id", "=", "registrations.event_id")
      .where("registrations.confirmed", 1)
      .sum("events.price as revenue")
      .first();
    return parseFloat(result?.revenue || "0");
  }



  async getRecentRegistrations(limit: number): Promise<RecentRegistration[]> {
    return this.knex("registrations")
      .join("attendees", "attendees.id", "=", "registrations.attendee_id")
      .join("events", "events.id", "=", "registrations.event_id")
      .select(
        "attendees.id",
        "attendees.first_name",
        "attendees.last_name",
        "attendees.email",
        "events.name as event_name"
      )
      .orderBy("attendees.id", "desc")
      .limit(limit);
  }

  async findAllWithAttendees(
    status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "ATTENDED"
  ): Promise<(RecentRegistration & { status: string; event_id: number; attendee_id: number })[]> {
    let query = this.knex("registrations")
      .join("attendees", "attendees.id", "=", "registrations.attendee_id")
      .join("events", "events.id", "=", "registrations.event_id")
      .select(
        "registrations.event_id",
        "registrations.attendee_id",
        "attendees.id",
        "attendees.first_name",
        "attendees.last_name",
        "attendees.email",
        "events.name as event_name",
        "registrations.status"
      )
      .orderBy("attendees.id", "desc");

    if (status) {
      query = query.where("registrations.status", status);
    }

    return query;
  }

  async updateStatus(
    eventId: number,
    attendeeId: number,
    status: "PENDING" | "CONFIRMED" | "CANCELLED" | "ATTENDED"
  ): Promise<void> {
    await this.knex("registrations")
      .where({
        event_id: eventId,
        attendee_id: attendeeId,
      })
      .update({
        status: status,
      });
  }
}
