import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function InscriptionValidation() {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            Demande d&apos;inscription envoyée
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Vous avez reçu un mail avec un lien de confirmation. Merci
              d&apos;aller cliquer sur ce lien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
