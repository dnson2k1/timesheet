import React from "react";
import { ITimeStatisticTask } from "~/interfaces/viewProjectType";
import BillableTask from "./components/BillableTask";
import NonBillableTask from "./components/NonBillableTask";

type Props = {
  tasks: ITimeStatisticTask[];
};

const Tasks = ({ tasks }: Props) => {
  const billableTasks = tasks.filter((task) => task.billable);
  const nonBillableTasks = tasks.filter((task) => !task.billable);
  return (
    <>
      <BillableTask billableTasks={billableTasks} />
      <NonBillableTask nonBillableTasks={nonBillableTasks} />
    </>
  );
};

export default Tasks;
