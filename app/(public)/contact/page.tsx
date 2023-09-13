"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import AlertSendMessage from "@/app/(public)/_components/alertsendmessage/alertsendmessage";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function FormContact() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: Record<string, any>) => {
    try {
      // Ici, on change le point d'API vers lequel on envoie les données du formulaire.

      const response = await fetch("http://localhost:8000/contacte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const newUser = await response.json();
        const formElt = document.getElementById("contacteForm");
        if (formElt) {
          formElt.style.display = "none";
        }
        const successMessage = document.getElementById("success");
        if (successMessage) {
          successMessage.style.display = "block";
        }
        reset();
        console.log(newUser);
      }
    } catch (e) {
      console.error("Erreur lors de la récupération des données:", e);
    }
    console.log("Values::::::", data);
  };

  const onError = (errors: unknown) => {
    console.log("Error::::::", errors);
    if (!isSwitchChecked) {
      setErrorMessage("Veuillez accepter la politique de confidentialité.");
      return;
    }
    setErrorMessage("");
  };

  return (
    <div className="isolate bg-background-grey px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Restons en contact
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Remplissez le formulaire ci-dessous et notre équipe vous répondra dans
          les plus brefs délais.
        </p>
      </div>
      <form
        id="contacteForm"
        onSubmit={handleSubmit(onSubmit, onError)}
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Prénom
            </label>
            <div className="mt-2.5">
              <input
                {...register("firstname", {
                  required: "Veuillez renseigner votre prénom.",
                  minLength: {
                    value: 2,
                    message: "Le prénom doit avoir au moins 2 caractères.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Le prénom doit être de 20 caractères maximum.",
                  },
                  pattern: {
                    value: /^[A-Za-z-]+$/i,
                    message: "Le prénom ne doit contenir que des lettres.",
                  },
                })}
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-orange sm:text-sm sm:leading-6"
              />
              {errors.firstname && (
                <p className="text-sm text-red-500 mt-2">
                  {(errors.firstname.message as string) || ""}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nom
            </label>
            <div className="mt-2.5">
              <input
                {...register("lastname", {
                  required: "Veuillez renseigner votre nom.",
                  minLength: {
                    value: 2,
                    message: "Le nom doit avoir au moins 2 caractères.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Le nom doit être de 30 caractères maximum.",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: "Le nom ne doit contenir que des lettres.",
                  },
                })}
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-orange sm:text-sm sm:leading-6"
              />
              {errors.lastname && (
                <p className="text-sm text-red-500 mt-2">
                  {(errors.lastname.message as string) || ""}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register("email", {
                  required: "Veuillez renseigner votre adresse mail.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Votre adresse mail n'est pas au bon format.",
                  },
                  maxLength: {
                    value: 60,
                    message:
                      "L'adresse email doit être de 60 caractères maximum.",
                  },
                })}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-orange sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-2">
                  {(errors.email.message as string) || ""}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                {...register("message", {
                  required: "Veuillez renseigner votre message.",
                  minLength: {
                    value: 10,
                    message: "Le message doit avoir au moins 10 caractères.",
                  },
                  maxLength: {
                    value: 500,
                    message: "Le message doit être de 500 caractères maximum.",
                  },
                })}
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-orange sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              {errors.message && (
                <p className="text-sm text-red-500 mt-2">
                  {(errors.message.message as string) || ""}
                </p>
              )}
            </div>
          </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={isSwitchChecked}
                onChange={(checked) => {
                  setIsSwitchChecked(checked);
                  if (checked) {
                    setErrorMessage("");
                  }
                }}
                className={classNames(
                  isSwitchChecked ? "bg-primary-orange" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                )}
              >
                <span className="sr-only">
                  Accepter les politiques de confidentialités
                </span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    isSwitchChecked ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out",
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              En sélectionnant cette option, vous acceptez notre{" "}
              {/* Ici, on change le liens vers la page de politique de confidentialité */}
              <a href="#" className="font-semibold text-primary-orange">
                Politique&nbsp;de&nbsp;confidentialité
              </a>
              .
            </Switch.Label>
          </Switch.Group>
          {errorMessage && (
            <p className="text-sm text-red-500 sm:col-span-2">{errorMessage}</p>
          )}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-primary-orange px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange-orange"
          >
            Parlons-en !
          </button>
        </div>
        <AlertSendMessage />
      </form>
    </div>
  );
}
