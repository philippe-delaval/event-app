import { knex } from "knex";

export const knexClient = knex({
  client: "pg",
  connection: getPgConnectionString(),
  searchPath: ["knex", "public"],
});

function getPgConnectionString() {
  if (!process.env.PG_CONNECTION_STRING) {
    throw new Error("PG_CONNECTION_STRING not set");
  }

  return process.env.PG_CONNECTION_STRING;
}
