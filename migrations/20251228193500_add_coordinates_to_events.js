/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table.float("latitude");
    table.float("longitude");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table.dropColumn("latitude");
    table.dropColumn("longitude");
  });
};
