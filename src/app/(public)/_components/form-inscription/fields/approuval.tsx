"use client";

import { Switch } from "@headlessui/react";
import { useState } from "react";

function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Approuval() {
  const [enabled2, setEnabled2] = useState(false);

  return (
    <div className="bg-white shadow sm:rounded-lg mt-3">
      <Switch.Group as="div" className="px-4 py-5 sm:p-6">
        <Switch.Label
          as="h3"
          className="text-base font-semibold leading-6 text-gray-900"
          passive
        >
          Consentement des données personnelles pour l&#39;inscription à
          l&#39;événement Apéro Dev
        </Switch.Label>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <Switch.Description>
              En cochant cette case, j&#39;accepte que mes données personnelles
              soient recueillies et traitées conformément à la politique de
              confidentialité. Je suis informé(e) que ces données sont
              recueillies par ATI4 Group dans le but de gérer mon inscription à
              l&#39;évènement Apéro Dev et que je dispose d&#39;un droit
              d&#39;accès, de rectification et de suppression de mes données en
              contactant l&#39;adresse email de contact pour la gestion des
              données.
            </Switch.Description>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <Switch
              checked={enabled2}
              onChange={setEnabled2}
              className={classNames(
                enabled2 ? "bg-primary" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-hover focus:ring-offset-2",
              )}
            >
              <span className="sr-only">Utiliser le réglage</span>
              <span
                className={classNames(
                  enabled2 ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                )}
              >
                <span
                  className={classNames(
                    enabled2
                      ? "opacity-0 duration-100 ease-out"
                      : "opacity-100 duration-200 ease-in",
                    "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                  )}
                  aria-hidden="true"
                >
                  <svg
                    className="h-3 w-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={classNames(
                    enabled2
                      ? "opacity-100 duration-200 ease-in"
                      : "opacity-0 duration-100 ease-out",
                    "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                  )}
                  aria-hidden="true"
                >
                  <svg
                    className="h-3 w-3 text-primary"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                  </svg>
                </span>
              </span>
            </Switch>
          </div>
        </div>
      </Switch.Group>
    </div>
  );
}
