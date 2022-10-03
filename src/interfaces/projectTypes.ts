import {
  BRANCH_USER,
  PROJECT_STATUS,
  PROJECT_TYPES,
  TYPE_USER,
} from "./../enum/index";
import { ITaskItem } from "./taskTypes";
export type IProject = {
  id: number;
  name: string;
  customerName: string;
  code: string;
  status: PROJECT_STATUS;
  pms: string[];
  activeMember: number;
  projectType: PROJECT_TYPES;
  timeStart: Date;
  timeEnd: Date;
};

export type IProjectList = {
  customerName: string;
  list: IProject[];
};
export interface ProjectTargetUser {
  userId: number;
  roleName: string;
  id?: number;
}
export type IDataForm = {
  name: string;
  code: string;
  status?: number;
  timeStart: Date;
  timeEnd: Date;
  note: string;
  projectType: number;
  customerId: number;
  users: IUserType[];
  tasks: ITaskItem[];
  projectTargetUsers: ProjectTargetUser[];
  komuChannelId: string;
  isNotifyToKomu: boolean;
  isAllUserBelongTo: boolean;
  id?: number;
};

export type IFiltersMember = {
  branch: BRANCH_USER;
  type: TYPE_USER;
};

export type IUserMemberType = {
  userId: number;
  type: number;
};
export type IStateProject = {
  listUserProject: IProjectUser[];
  listUserJoinProject: IProjectUser[];
  userMemberType: IUserMemberType[];
  loading: boolean;
  searchValueMember: string;
  searchValueTeam: string;
  error: string;
  filters: IFiltersMember;
  isEdit: boolean;
  projectEdit: IDataForm;
  targetUser: ITargetUser[];
  targetUserJoin: ITargetUser[];
  commonTask: ITaskItem[];
  ortherTask: ITaskItem[];
};
export type ILisiUserJoin = {
  users: IUserType;
};

export type IUserType = {
  userId: number;
  type: number;
  id: number;
};
export type IProjectUser = {
  id: number;
  name: string;
  emailAddress: string;
  isActive: boolean;
  type: number;
  jobTitle: string | null;
  level: number;
  userCode: string | null;
  avatarPath: string;
  avatarFullPath: string;
  branch: number;
  branchDisplayName: string | null;
  branchColor: string | null;
  branchId: number | null;
  user: IUserMemberType; // users
};

export interface ITargetUser {
  userId: number;
  roleName: string;
  name: string;
  id?: number;
}
