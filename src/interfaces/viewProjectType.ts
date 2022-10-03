import { PROJECT_USER_TYPE } from "~/enum";

export type ITimeStatisticTask = {
  taskId: number;
  taskName: string;
  totalWorkingTime: number;
  billableWorkingTime: number;
  billable: boolean;
};
export type ITimeStatisticMember = {
  userID: number;
  userName: string;
  projectUserType: PROJECT_USER_TYPE;
  totalWorkingTime: number;
  billableWorkingTime: number;
};

export type IStateView = {
  timeStatisticTasks: ITimeStatisticTask[];
  timeStatisticMembers: ITimeStatisticMember[];
};
export interface ViewProjectRequest {
  projectId: number;
  startDate: string;
  endDate: string;
}
