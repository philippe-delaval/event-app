"use client";

import { useRef } from "react";
import EventInfo from "../eventinfo/eventinfo";
import FormInscription from "../form-inscription/form-inscription";
import { AppEvent } from "../../../../core/entities/app_event";

export const HomeBody = ({ nextAppEvent }: { nextAppEvent: AppEvent }) => {
  const formRef = useRef(null); // Créez la référence ici

  return (
    <>
      <EventInfo formRef={formRef} nextAppEvent={nextAppEvent} />
      <div ref={formRef}>
        <FormInscription />
      </div>
    </>
  );
};
