import { CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";

export const NAV = [
  {
    id: 1,
    path: "/",
    display: "Home page",
    icon: <HomeIcon width={25} />,
  },
  {
    id: 2,
    path: "/projects",
    display: "Projects",
    icon: <ChartBarIcon width={25} />,
  },
  {
    id: 3,
    path: "/timesheet",
    display: "Timesheet",
    icon: <CalendarIcon width={25} />,
  },
];
