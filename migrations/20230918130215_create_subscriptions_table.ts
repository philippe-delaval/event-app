import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("subscriptions", (table) => {
      table.integer("event_id").unsigned();
      table.foreign("event_id").references('events.id').deferrable('deferred');
      table.integer("attendee_id").unsigned();
      table.foreign("attendee_id").references('attendees.id').deferrable('deferred');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("subscriptions");
}

