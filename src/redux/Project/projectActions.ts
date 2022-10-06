import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BRANCH_USER, TYPE_USER } from "~/enum";
import {
  IDataForm,
  IProjectUser,
  IStateProject,
  ITargetUser,
} from "~/interfaces/projectTypes";
import { ITaskItem } from "~/interfaces/taskTypes";

export const projectActions = {
  resetProjectForm: (state: IStateProject) => {
    state.projectEdit = {} as IDataForm;
    state.listUserJoinProject = [];
  },
  changeIsEdit: (state: IStateProject, action: PayloadAction<boolean>) => {
    state.isEdit = action.payload;
  },
  changeFilterBranchMember: (
    state: IStateProject,
    action: PayloadAction<BRANCH_USER>
  ) => {
    state.filters.branch = action.payload;
  },
  changeFilterTypeMember: (
    state: IStateProject,
    action: PayloadAction<TYPE_USER>
  ) => {
    state.filters.type = action.payload;
  },
  changeSearchValueMember: (
    state: IStateProject,
    action: PayloadAction<string>
  ) => {
    state.searchValueMember = action.payload;
  },
  changeSearchValueTeam: (
    state: IStateProject,
    action: PayloadAction<string>
  ) => {
    state.searchValueTeam = action.payload;
  },
  changeMemberType: (
    state: IStateProject,
    action: PayloadAction<{ id: number; type: number }>
  ) => {
    state.listUserJoinProject = state.listUserJoinProject.map((user) => {
      if (user.id === action.payload.id) {
        return {
          ...user,
          user: { userId: action.payload.id, type: action.payload.type },
        };
      }
      return user;
    });
  },
  addMemberJoinProject: (
    state: IStateProject,
    action: PayloadAction<number>
  ) => {
    const member = state.listUserProject.find(
      (user) => user.id === action.payload
    ) as IProjectUser;

    if (state.listUserJoinProject.length > 0) {
      state.listUserJoinProject.push({
        ...member,
        users: { userId: member.id, type: member.type },
      });
    } else {
      state.listUserJoinProject.push({
        ...member,
        users: { userId: member.id, type: 1 },
      });
    }
    state.listUserProject = state.listUserProject.filter(
      (user) => user.id !== action.payload
    );
  },
  removeJoinProject: (state: IStateProject, action: PayloadAction<number>) => {
    const member = state.listUserJoinProject.find(
      (user) => user.id === action.payload
    );
    if (member) {
      state.listUserProject.unshift(member);
      state.listUserJoinProject = state.listUserJoinProject.filter(
        (user) => user.id !== action.payload
      );
    }
  },
  addTargetUserToProject: (
    state: IStateProject,
    action: PayloadAction<number>
  ) => {
    const User = state.targetUser.find(
      (user) => user.userId === action.payload
    ) as ITargetUser;
    state.targetUserJoin.push(User);
    state.targetUser = state.targetUser.filter(
      (user) => user.userId !== action.payload
    );
    toast.success("Add target user success");
  },
  removeTargetUserFromProject: (
    state: IStateProject,
    action: PayloadAction<number>
  ) => {
    const User = state.targetUserJoin.find(
      (user) => user.userId === action.payload
    ) as ITargetUser;
    state.targetUser.push(User);
    state.targetUserJoin = state.targetUserJoin.filter(
      (user) => user.userId !== action.payload
    );
    toast.success("Remove target user success");
  },
  changeRoleTargetUser: (
    state: IStateProject,
    action: PayloadAction<{ id: number; name: string }>
  ) => {
    state.targetUserJoin = state.targetUserJoin.map((user) => {
      if (user.userId === action.payload.id)
        return { ...user, roleName: action.payload.name };
      return user;
    });
  },

  changeStatusAllCheckFalse: (state: IStateProject) => {
    state.commonTask = state.commonTask.map((task) => {
      return { ...task, billable: false };
    });
  },
  changeStatusCheck: (state: IStateProject, action: PayloadAction<number>) => {
    state.commonTask = state.commonTask.map((task) => {
      if (task.taskId === action.payload) {
        return { ...task, billable: !task.billable };
      }
      return task;
    });
  },
  addToCommonTasks: (state: IStateProject, action: PayloadAction<number>) => {
    const tempTask = state.ortherTask.find(
      (task) => task.taskId === action.payload
    ) as ITaskItem;
    state.ortherTask = state.ortherTask.filter(
      (task) => task.taskId !== action.payload
    );
    state.commonTask.push(tempTask);
    toast.success("Archive Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  },
  addToOtherTasks: (state: IStateProject, action: PayloadAction<number>) => {
    const tempTask = state.commonTask.find(
      (task) => task.taskId === action.payload
    ) as ITaskItem;
    state.commonTask = state.commonTask.filter(
      (task) => task.taskId !== action.payload
    );
    state.ortherTask.push(tempTask);
    toast.success("DeArchive Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  },
  changeStatusAllCheck: (state: IStateProject) => {
    state.commonTask = state.commonTask.map((task) => {
      return { ...task, billable: true };
    });
  },
};
