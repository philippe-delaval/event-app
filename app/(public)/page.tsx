import { getNextAppEvent } from "../../core/use_case/get_next_app_event";
import { HomeBody } from "./_components/home/body";

export default async function HomePageLayout() {
  const nextAppEvent = await getNextAppEvent();

  return <HomeBody nextAppEvent={nextAppEvent} />;
}
