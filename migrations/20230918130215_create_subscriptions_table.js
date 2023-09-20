/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("registrations", (table) => {
        table.integer("event_id").unsigned();
        table.foreign("event_id").references("events.id").deferrable("deferred");
        table.integer("attendee_id").unsigned();
        table
            .foreign("attendee_id")
            .references("attendees.id")
            .deferrable("deferred");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("registrations");
};
