import {
  getNextAppEvent,
  NextAppEventNotFoundError,
} from "@/core/use_case/get_next_app_event";
import { HomeBody } from "./_components/home/body";
import { AppEvent } from "@/core/entities/app_event";

export default async function HomePageLayout() {
  let nextAppEvent: AppEvent;

  try {
    nextAppEvent = await getNextAppEvent();
  } catch (error) {
    if (error instanceof NextAppEventNotFoundError) {
      return <div>Il n'y pas d'évènements à venir</div>;
    }
    throw error;
  }

  return <HomeBody nextAppEvent={nextAppEvent} />;
}
