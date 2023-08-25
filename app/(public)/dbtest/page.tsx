import { knexClient } from "@/lib/knex";

export default async function Page() {
  const result = await knexClient.raw("SELECT 1+1 AS result");
  console.log(result);

  return (
    <>
      <h1>DbTest</h1>
    </>
  );
}
