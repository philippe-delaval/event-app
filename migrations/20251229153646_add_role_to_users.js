exports.up = async function(knex) {
  await knex.schema.alterTable("users", (table) => {
    table
      .string("role")
      .notNullable()
      .defaultTo("ORGANIZER"); // Defaulting to ORGANIZER for backward compatibility
  });
};

exports.down = async function(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("role");
  });
};
