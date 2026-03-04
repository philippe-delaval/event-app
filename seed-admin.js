const { hash } = require("bcryptjs");


// Since this is a standalone script, we might need to setup knex manually or use the existing lib if compatible with CJS
// For simplicity, let's use the knexfile config
const knex = require("knex")({
  client: "postgresql",
  connection: {
    host: "localhost",
    port: 5433,
    database: "postgres",
    user: "postgres",
    password: "example",
  },
});

async function seed() {
  const email = "admin@event-app.com";
  const password = "password123";
  const passwordHash = await hash(password, 10);

  try {
    await knex("users").insert({
      email,
      password_hash: passwordHash,
    });
    console.log("Admin user created");
  } catch (error) {
    if (error.code === "23505") {
      console.log("Admin user already exists");
    } else {
      console.error("Error creating admin user:", error);
    }
  } finally {
    await knex.destroy();
  }
}

seed();
