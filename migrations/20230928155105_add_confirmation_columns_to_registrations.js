/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("registrations", (table) => {
    table.string("confirmation_token", 36).notNullable();
    table.boolean("confirmed").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("registrations", (table) => {
    table.dropColumn("confirmation_token");
    table.dropColumn("confirmed");
  });
};
