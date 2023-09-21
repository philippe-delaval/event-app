import FirstName from "./fields/firstname";
import LastName from "./fields/lastname";
import { registerToEvent } from "@/core/use-cases/register-to-event";

export default async function FormInscription() {
  async function create(formData: FormData) {
    "use server";

    await registerToEvent({
      firstName: formData.get("first-name")?.toString() ?? "",
      lastName: formData.get("last-name")?.toString() ?? "",
    });
  }

  return (
    <div className="bg-background-grey pb-10">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
        <div className=" px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Formulaire d&#39;inscription
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Remplissez les informations requises pour réserver votre place à
              l&#39;Apéro Dev.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <form action={create} method="post">
            <div className="space-y-12 sm:space-y-16">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Informations personnelles
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  Assurez-vous de fournir des informations précises et complètes
                  dans le formulaire afin de recevoir un billet valide pour
                  l&#39;événement.
                </p>
                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <FirstName />
                  <LastName />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-primary-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Valider mon inscription et générer mon e-billet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
