"use client";

import { useRef } from "react";
import EventInfo from "../eventinfo/eventinfo";
import FormInscription from "../form-inscription/form-inscription";
import { AppEvent } from "@/core/models/app_event";
import AdBanner from "@/app/(public)/_components/adbanner/adbanner";
import Countdown from "@/app/(public)/_components/countdown/countdown";
import Sponsors from "@/app/(public)/_components/sponsors/sponsors";

export const HomeBody = ({ nextAppEvent }: { nextAppEvent: AppEvent }) => {
  const formRef = useRef(null); // Créez la référence ici

  return (
    <>
      <AdBanner formRef={formRef} />
      <Countdown targetDate={nextAppEvent.begin_date.toString()} />
      <EventInfo formRef={formRef} nextAppEvent={nextAppEvent} />
      <Sponsors />
      <div ref={formRef}>
        <FormInscription />
      </div>
    </>
  );
};
