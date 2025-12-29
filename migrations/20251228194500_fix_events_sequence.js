/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  if (knex.client.config.client === 'pg' || knex.client.config.client === 'postgresql') {
    return knex.raw("SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));");
  }
  return Promise.resolve();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // No rollback needed for sequence reset
  return Promise.resolve();
};
