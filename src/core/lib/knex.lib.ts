import { Knex, knex } from "knex";
import { getEnvVariable } from "./env.lib";

declare global {
  // eslint-disable-next-line no-var
  var knexClient: (Knex & { clientId?: number }) | undefined;
}

export function getKnexClient(): Knex {
  if (process.env.NODE_ENV === "test") {
    return makeTestKnexClient();
  }

  if (!globalThis.knexClient) {
    const clientId = Math.floor(Math.random() * 10000);
    console.log(`[Knex] Creating new client (ID: ${clientId})...`);
    globalThis.knexClient = makeKnexClient();
    globalThis.knexClient.clientId = clientId;
  } else {
    console.log(
      `[Knex] Reusing existing client (ID: ${globalThis.knexClient.clientId}).`
    );
  }

  return globalThis.knexClient;
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
    pool: {
      min: 0,
      max: 1,
      idleTimeoutMillis: 1000,
      reapIntervalMillis: 1000,
    },
    searchPath: ["knex", "public"],
  });
}
