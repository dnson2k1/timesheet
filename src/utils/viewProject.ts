import { ITaskItem } from "~/interfaces/taskTypes";
import {
  ITimeStatisticMember,
  ITimeStatisticTask,
} from "~/interfaces/viewProjectType";

export const countBilledTasks = (tasks: ITaskItem[]) => {
  let BillableTasks = 0;
  tasks.forEach((task) => {
    if (task.billable) BillableTasks++;
  });
  return BillableTasks;
};

export const percentCalc = (billableTime: number, time: number) => {
  if (billableTime / time)
    return `(${((billableTime / time) * 100).toFixed(2)}%)`;
  else return "(0%)";
};

export const totalWorkingTime = (
  arrayView: ITimeStatisticTask[] | ITimeStatisticMember[]
) => {
  let sum = 0;
  arrayView.forEach((item) => {
    sum += item.totalWorkingTime;
  });
  return sum;
};

export const billableTime = (
  arrayView: ITimeStatisticTask[] | ITimeStatisticMember[]
) => {
  let sum = 0;
  arrayView.forEach((item) => {
    sum += item.billableWorkingTime;
  });
  return sum;
};

export const convertToHourAndMinute = (amount: number) => {
  if (!amount) return "";
  const hours = Math.floor(amount / 60);
  const minutes = amount % 60;
  const hoursString = hours < 10 ? `0${hours}` : String(hours);
  const minutesString = minutes < 10 ? `0${minutes}` : String(minutes);
  return `${hoursString}:${minutesString}`;
};
