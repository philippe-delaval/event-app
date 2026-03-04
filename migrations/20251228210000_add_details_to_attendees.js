/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("attendees", (table) => {
    table.string("job_title").nullable();
    table.string("company").nullable();
    table.boolean("marketing_consent").defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("attendees", (table) => {
    table.dropColumn("job_title");
    table.dropColumn("company");
    table.dropColumn("marketing_consent");
  });
};
