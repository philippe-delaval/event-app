/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("events", (table) => {
    table.string("name").notNullable();
    table.string("description").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("events", (table) => {
    table.dropColumn("name");
    table.dropColumn("description");
  });
};
