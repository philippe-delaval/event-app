import { Knex } from "knex";
import { AppEvent } from "../models/app-event";

export class AppEventsRepository {
  constructor(private readonly knex: Knex) {}

  async findNextAppEvent(): Promise<AppEvent | null> {
    const [appEvent] = await this.knex("events")
      .select("id", "name", "description", "begin_date")
      .where("begin_date", ">", new Date())
      .orderBy("begin_date", "asc")
      .limit(1);

    return appEvent ?? null;
  }
}
