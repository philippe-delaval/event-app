import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const event = await knex("events").where({ id: 1 }).first();

  if (event) {
    return;
  }

  await knex("events").insert([
    {
      id: 1,
      name: "</Apéro Dev >",
      description: "L'apéro développeur en plein coeur de Strasbourg.",
      begin_date: new Date("2023-09-30T18:30:00.000+00:00"),
    },
  ]);
}
