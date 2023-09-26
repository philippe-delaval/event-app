import { Knex, knex } from "knex";
import { getEnvVariable } from "./env.lib";

let knexClient: Knex;

export function getKnexClient(): Knex {
  if (!knexClient) {
    if (process.env.NODE_ENV === "test") {
      knexClient = makeTestKnexClient();
    } else {
      knexClient = makeKnexClient();
    }
  }

  return knexClient;
}

export function makeTestKnexClient(): Knex {
  const inMemoryClient = knex({
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
  });

  return inMemoryClient;
}

function makeKnexClient(): Knex {
  return knex({
    client: "pg",
    connection: {
      connectionString: getEnvVariable("POSTGRES_URL"),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    searchPath: ["knex", "public"],
  });
}
