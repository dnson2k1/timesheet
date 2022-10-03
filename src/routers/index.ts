import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Projects from "~/pages/Projects";
import TimeSheet from "~/pages/Timesheet";

export const publicRouter = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/timesheet",
    component: TimeSheet,
  },
  {
    path: "/account/login",
    component: Login,
  },
];

export const privateRouter = [];
