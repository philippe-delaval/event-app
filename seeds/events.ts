import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("events").del();

  // Inserts seed entries
  await knex("events").insert([
    {
      id: 1,
      name: "</Apéro Dev >",
      description: "L'apéro développeur en plein coeur de Strasbourg.",
      begin_date: new Date("2023-09-30T18:30:00.000Z"),
    },
  ]);
}
