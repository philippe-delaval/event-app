import { Knex, knex } from "knex";

let knexClient: Knex;

export function getKnexClient(): Knex {
  if (!knexClient) {
    knexClient = makeKnexClient();
  }

  return knexClient;
}

export async function makeTestKnexClient(): Knex {
  const inMemoryClient = knex({
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
  });

  await inMemoryClient.migrate.latest();

  return inMemoryClient;
}

function makeKnexClient(): Knex {
  return knex({
    client: "pg",
    connection: {
      connectionString: getPostgresUrl(),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    searchPath: ["knex", "public"],
  });
}

function getPostgresUrl() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL not set");
  }

  return process.env.POSTGRES_URL;
}
