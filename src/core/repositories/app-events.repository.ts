import { Knex } from "knex";
import { AppEvent } from "../models/app-event";

export class AppEventsRepository {
  constructor(private readonly knex: Knex) {}

  async findNextAppEvent(): Promise<AppEvent | null> {
    const [appEvent] = await this.knex("events")
      .select("*")
      .where("begin_date", ">", new Date())
      .orderBy("begin_date", "asc")
      .limit(1);

    return appEvent ?? null;
  }

  async createEvent(event: {
    name: string;
    description: string;
    begin_date: Date;
    end_date?: Date;
    location?: string;
    max_capacity?: number;
    image_url?: string;
    status: string;
    latitude?: number;
    longitude?: number;
  }): Promise<void> {
    await this.knex("events").insert(event);
  }

  async findPastAppEvents(): Promise<AppEvent[]> {
    return this.knex("events")
      .select("*")
      .where("begin_date", "<", new Date())
      .orderBy("begin_date", "desc");
  }

  async countTotalEvents(): Promise<number> {
    const result = await this.knex("events").count("id as count").first();
    return parseInt(result?.count?.toString() || "0", 10);
  }

  async findAllEvents(): Promise<AppEvent[]> {
    return this.knex("events")
      .select("*")
      .orderBy("begin_date", "desc");
  }
}
