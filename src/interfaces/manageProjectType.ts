import { PROJECT_USER_TYPE } from "./../enum/index";
import { FILTER_SELECTED } from "~/enum";
import { IProject } from "./projectTypes";

export type IRequest = {
  status: FILTER_SELECTED;
  search: string;
};
export type IProjectQuantities = {
  status: number;
  quantity: number;
};

export type IStateManageProject = {
  projectList: IProject[];
  request: IRequest;
  projectQuantities: IProjectQuantities[];
  filterStatus: FILTER_SELECTED;
  loading: boolean;
  error: string;
};

export type GetAllProject = {
  status: 0 | 1;
  search: string;
};
