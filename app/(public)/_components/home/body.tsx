import EventInfo from "../eventinfo/eventinfo";
import { AppEvent } from "@/core/models/app_event";
import AdBanner from "@/app/(public)/_components/adbanner/adbanner";
import Countdown from "@/app/(public)/_components/countdown/countdown";
import Sponsors from "@/app/(public)/_components/sponsors/sponsors";

export const HomeBody = ({ nextAppEvent }: { nextAppEvent: AppEvent }) => {
  return (
    <>
      <AdBanner />
      <Countdown targetDate={nextAppEvent.begin_date.toString()} />
      <EventInfo nextAppEvent={nextAppEvent} />
      <Sponsors />
    </>
  );
};
