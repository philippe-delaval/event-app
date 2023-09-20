/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("registrations", function (table) {
        table.primary(["event_id", "attendee_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table("registrations", function (table) {
        table.dropPrimary(["event_id", "attendee_id"]);
    });
};
