exports.up = async function(knex) {
  await knex.schema.table("registrations", (table) => {
    table
      .enum("status", ["PENDING", "CONFIRMED", "CANCELLED", "ATTENDED"])
      .defaultTo("PENDING");
  });
};

exports.down = async function(knex) {
  await knex.schema.table("registrations", (table) => {
    table.dropColumn("status");
  });
};
