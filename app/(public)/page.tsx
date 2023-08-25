'use client'

import { useRef } from 'react';
import EventInfo from "@/app/(public)/_components/eventinfo/eventinfo";
import FormInscription from "@/app/(public)/_components/form-inscription/form-inscription";

export default function HomePageLayout() {
    const formRef = useRef(null);  // Créez la référence ici

    return (
        <>
            <EventInfo formRef={formRef} />
            <div ref={formRef}>
                <FormInscription />
            </div>
        </>
    )
}
