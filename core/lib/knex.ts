import { Knex, knex } from "knex";

export function makeKnexClient(): Knex {
  return knex({
    client: "pg",
    connection: getPostgresUrl(),
    searchPath: ["knex", "public"],
  });
}

function getPostgresUrl() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL not set");
  }

  return process.env.POSTGRES_URL;
}
