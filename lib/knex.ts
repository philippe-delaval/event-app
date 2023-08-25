import { knex } from "knex";

export const knexClient = knex({
  client: "pg",
  connection:  "postgresql://postgres:example@db/postgres",
  searchPath: ['knex', 'public'],
});
