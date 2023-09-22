import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import React from "react";
import { AppEvent } from "@/core/models/app-event";
import FormattedDate from "@/app/(public)/_components/date-formated/date-formated";
import MapGoogle from "@/app/(public)/_components/mapgoogle/mapgoogle";
import Link from "next/link";

type EventInfoProps = {
  nextAppEvent: AppEvent;
};

function EventInfo({ nextAppEvent }: EventInfoProps) {
  return (
    <>
      <div className="bg-background-grey">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-12 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-12 xl:gap-x-20 xl:px-20">
              {/* Map Area */}
              <MapGoogle />
              <div className="w-full flex-auto">
                <h2 className="font-bebas text-5xl tracking-tight text-black sm:text-8xl">
                  {nextAppEvent.name}
                </h2>
                <p className="mt-6 text-lg leading-8 text-primary-gray">
                  {nextAppEvent.description}
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

                    <FormattedDate
                      date={new Date(nextAppEvent.begin_date)}
                      options={{
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Link
                    href="/inscription"
                    className="rounded-md bg-primary-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-secondary-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Réservez votre billet !
                  </Link>
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
    </>
  );
}

export default EventInfo;
