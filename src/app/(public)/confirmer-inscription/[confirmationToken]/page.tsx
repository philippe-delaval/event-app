import { CoreUseCasesLive } from "@/core/use-cases";

export default async function ConfirmerInscriptionPage({
  params,
}: {
  params: {
    confirmationToken: string;
  };
}) {
  await CoreUseCasesLive.confirmRegistration({
    confirmationToken: params.confirmationToken,
  });

  return (
    <div>
      <h1>Merci !</h1>
      <p>Votre a inscription à l&apos;évènement a été confirmée</p>
    </div>
  );
}
