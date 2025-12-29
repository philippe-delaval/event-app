exports.up = async function(knex) {
  await knex.schema.table("events", (table) => {
    table.decimal("price", 14, 2).defaultTo(0);
  });
};

exports.down = async function(knex) {
  await knex.schema.table("events", (table) => {
    table.dropColumn("price");
  });
};
