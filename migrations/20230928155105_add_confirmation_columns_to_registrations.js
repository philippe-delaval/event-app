/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("registrations", (table) => {
    table.string("confirmation_hash", 60).notNullable();
    table.boolean("confirmed").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("registrations", (table) => {
    table.dropColumn("confirmation_hash");
    table.dropColumn("confirmed");
  });
};
