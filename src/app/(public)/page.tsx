import { HomeBody } from "./_components/home/body";
import { AppEvent } from "@/core/models/app-event";
import EventNo from "@/app/(public)/_components/event-no/event-no";
import { CoreUseCasesLive } from "../../core/use-cases";
import { NextAppEventNotFoundError } from "../../core/use-cases/get-next-app-event.use-case";

export const dynamic = "force-dynamic";

export default async function HomePageLayout() {
  let nextAppEvent: AppEvent;

  try {
    nextAppEvent = await CoreUseCasesLive.getNextAppEvent();
  } catch (error) {
    if (error instanceof NextAppEventNotFoundError) {
      return <EventNo />;
    }
    throw error;
  }

  return <HomeBody nextAppEvent={nextAppEvent} />;
}
