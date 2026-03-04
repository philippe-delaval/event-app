import EventInfo from "../eventinfo/eventinfo";
import { AppEvent } from "@/core/models/app-event";
import Countdown from "@/app/(public)/_components/countdown/countdown";
import Sponsors from "@/app/(public)/_components/sponsors/sponsors";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import NewsletterSubscription from "@/app/(public)/_components/newsletter/newsletter-subscription";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

export const HomeBody = ({ nextAppEvent }: { nextAppEvent: AppEvent }) => {
  return (
    <>
      <HeroSection />
      <Countdown targetDate={nextAppEvent.begin_date.toString()} />
      <EventInfo nextAppEvent={nextAppEvent} />

      {nextAppEvent.latitude && nextAppEvent.longitude && (
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Localisation
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Retrouvez-nous à l&apos;événement !
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Map
                lat={nextAppEvent.latitude}
                lng={nextAppEvent.longitude}
                popupText={nextAppEvent.name}
              />
            </div>
          </div>
        </section>
      )}

      <FeaturesSection />
      <Sponsors />
      <div id="newsletter">
        <NewsletterSubscription />
      </div>
    </>
  );
};
