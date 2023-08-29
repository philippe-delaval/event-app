"use client";

import { useRef } from "react";
import EventInfo from "../eventinfo/eventinfo";
import FormInscription from "../form-inscription/form-inscription";

export const HomeBody = () => {
  const formRef = useRef(null); // Créez la référence ici

  return (
    <>
      <EventInfo formRef={formRef} />
      <div ref={formRef}>
        <FormInscription />
      </div>
    </>
  );
};
