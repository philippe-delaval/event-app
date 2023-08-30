import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("events", (table) => {
    table.string("name").notNullable();
    table.string("description").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("events", (table) => {
    table.dropColumn("name");
    table.dropColumn("description");
  });
}
