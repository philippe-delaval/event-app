import { Knex, knex } from "knex";

let knexClient: Knex;

export async function getKnexClient(): Promise<Knex> {
  if (!knexClient) {
    if (process.env.NODE_ENV === "test") {
      knexClient = await makeTestKnexClient();
    } else {
      knexClient = makeKnexClient();
    }
  }

  return knexClient;
}

export async function makeTestKnexClient(): Promise<Knex> {
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
