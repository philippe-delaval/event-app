/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table.datetime("end_date");
    table.string("location");
    table.integer("max_capacity");
    table.string("image_url");
    table.string("status").defaultTo("DRAFT");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("events", function (table) {
    table.dropColumn("end_date");
    table.dropColumn("location");
    table.dropColumn("max_capacity");
    table.dropColumn("image_url");
    table.dropColumn("status");
  });
};
