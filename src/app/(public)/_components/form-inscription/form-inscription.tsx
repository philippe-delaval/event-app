"use client";

import { useState } from "react";
import FirstName from "./fields/firstname";
import LastName from "./fields/lastname";
import { formInscriptionAction } from "./form-inscription-action";
import InscriptionValidation from "./inscription-validation";
import Email from "./fields/email";

export default function FormInscription() {
  const [successfullInscription, setSuccessfullInscription] = useState(false);
  const [errors, setErrors] = useState<
    ReadonlyArray<{
      path: string;
      message: string;
    }>
  >([]);

  async function onSubmit(formData: FormData) {
    const res = await formInscriptionAction(formData);

    if (!res.success) {
      setErrors(res.errors ?? []);
      return;
    }

    setSuccessfullInscription(true);
  }

  if (successfullInscription) {
    return <InscriptionValidation />;
  }

  return (
    <div className="bg-background pb-10">
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
          <p>{errors.map((issue) => `${issue.path} is ${issue.message}`)}</p>
          <form action={onSubmit} method="post">
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
                  <Email />
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="job-title"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Poste
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <input
                        type="text"
                        name="job-title"
                        id="job-title"
                        autoComplete="organization-title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Entreprise
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <div className="sm:col-span-2 sm:col-start-2">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            id="marketing-consent"
                            name="marketing-consent"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="marketing-consent"
                            className="font-medium text-gray-900"
                          >
                            J&apos;accepte de recevoir des informations sur les prochains événements
                          </label>
                          <p className="text-gray-500">
                            Nous respectons votre vie privée et ne partagerons pas vos données.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Valider mon inscription
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
