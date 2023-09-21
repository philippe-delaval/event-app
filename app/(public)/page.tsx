import {
  getNextAppEvent,
  NextAppEventNotFoundError,
} from "@/core/use-cases/get-next-app-event";
import { HomeBody } from "./_components/home/body";
import { AppEvent } from "@/core/models/app-event";
import EventNo from "@/app/(public)/_components/event-no/event-no";

export const dynamic = "force-dynamic";

export default async function HomePageLayout() {
  let nextAppEvent: AppEvent;

  try {
    nextAppEvent = await getNextAppEvent();
  } catch (error) {
    if (error instanceof NextAppEventNotFoundError) {
      return <EventNo />;
    }
    throw error;
  }

  return <HomeBody nextAppEvent={nextAppEvent} />;
}
