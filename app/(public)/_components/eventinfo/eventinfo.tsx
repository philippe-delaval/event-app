import Countdown from "@/app/(public)/_components/countdown/countdown";
import Counter from "@/app/(public)/_components/counter/counter";
import Sponsors from "@/app/(public)/_components/sponsors/sponsors";
import { CalendarIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import smoothScrollIntoView from "smooth-scroll-into-view-if-needed";
import React, { useEffect, useState } from "react";
import { AppEvent } from "@/core/entities/app_event";

type EventInfoProps = {
  formRef: React.RefObject<HTMLDivElement>;
  nextAppEvent: AppEvent;
};

EventInfo.propTypes = {
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

function EventInfo({ formRef, nextAppEvent }: EventInfoProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (formRef.current) {
      smoothScrollIntoView(formRef.current, {
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [dataEdition, setDataEdition] = useState("");

  useEffect(() => {
    const fetchEdition = async () => {
      try {
        const response = await fetch("http://localhost:8000/last-edition");
        const data = await response.json();
        console.log(data);
        setDataEdition(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchEdition()
      .then(() => {
        console.log("Données récupérées avec succès");
      })
      .catch((error) => {
        console.log("Erreur dans l'extraction des données :", error);
      });
  }, []);

  return (
    <>
      {/* Ad Banner Area */}
      {isVisible && (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-background-grey px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#545454] to-[#D1D1D3] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#D1D1D3] to-[#545454] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900">
              <strong className="font-semibold">
                Inscrivez-vous vite à l&#39;évènement, il ne reste que{" "}
                <Counter /> places !
              </strong>
            </p>
            <a
              href="#"
              onClick={handleLinkClick}
              className="flex-none rounded-full bg-primary-orange px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              C&#39;est par ici <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Fermer le bandeau</span>
              <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      {/* Countdown Area */}
      <Countdown targetDate="2023-09-01T00:00:00" />

      {/* Banner Area */}
      <div className="bg-background-grey">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-12 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-12 xl:gap-x-20 xl:px-20">
              <iframe
                className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84483.9933921125!2d7.67967996527845!3d48.56915859777497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8495e18b2c1%3A0x971a483118e7241f!2sStrasbourg!5e0!3m2!1sfr!2sfr!4v1688546468472!5m2!1sfr!2sfr"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ApéroDev"
              ></iframe>
              <div className="w-full flex-auto">
                <h2 className="font-bebas text-6xl tracking-tight text-black sm:text-8xl">
                  {nextAppEvent.name}
                </h2>
                <p className="mt-6 text-lg leading-8 text-primary-gray">
                  L&#39; apéro développeur en plein coeur de Strasbourg.
                </p>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-primary-gray">
                    <MapPinIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary-orange"
                      aria-hidden="true"
                    />
                    Strasbourg, France
                  </div>
                  <div className="mt-2 flex items-center text-sm text-primary-gray">
                    <CalendarIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-primary-orange"
                      aria-hidden="true"
                    />
                    01 Septembre 2023
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <a
                    href="#"
                    onClick={handleLinkClick}
                    className="rounded-md bg-primary-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Réservez votre billet !
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#EE7408] to-[#EE7408] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Sponsors Area */}
      <div>
        <div className="sponsors">
          <Sponsors />
        </div>
      </div>
    </>
  );
}

export default EventInfo;
