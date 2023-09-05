import {
  getNextAppEvent,
  NextAppEventNotFoundError,
} from "@/core/use_case/get_next_app_event";
import { HomeBody } from "./_components/home/body";
import { AppEvent } from "@/core/entities/app_event";
import EventNo from "@/app/(public)/_components/event-no/event-no";

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
