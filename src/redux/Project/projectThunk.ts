import { getAllTask } from "~/redux/ManageTask/manageTaskThunk";
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/configs/axios";
import {
  IDataForm,
  IProjectUser,
  IStateProject,
  ITargetUser,
} from "~/interfaces/projectTypes";
import { ITask, ITaskItem } from "~/interfaces/taskTypes";
import { toast } from "react-toastify";

export const getUserNotPagging = createAsyncThunk(
  "users/getUserNotPagging",
  async () => {
    const res = await axiosInstance.get(
      "/api/services/app/User/GetUserNotPagging"
    );
    return res.data;
  }
);

export const projectSave = createAsyncThunk(
  "project/save",
  async (data: IDataForm) => {
    const res = await axiosInstance.post(
      "/api/services/app/Project/Save",
      data
    );
    return res;
  }
);

export const getDataEdit = createAsyncThunk(
  "projectEdit/getData",
  async (id: number | undefined) => {
    const res = await axiosInstance.get("/api/services/app/Project/Get", {
      params: {
        input: id,
      },
    });
    return res.data;
  }
);

export const extraReducersProject = (
  builder: ActionReducerMapBuilder<IStateProject>
) => {
  builder
    .addCase(getUserNotPagging.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUserNotPagging.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(getUserNotPagging.fulfilled, (state, action) => {
      state.listUserProject = action.payload.result.filter(
        (user: IProjectUser) => user.isActive
      );
      state.targetUser = [];
      state.listUserProject.forEach((user) => {
        if (user.isActive) {
          state.targetUser.push({
            userId: user.id,
            roleName: "",
            name: user.name,
          });
        }
      });
    });
  builder
    .addCase(getAllTask.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(getAllTask.fulfilled, (state, action) => {
      state.commonTask = [];
      state.ortherTask = [];

      action.payload.filter((item: ITask) => {
        if (!item.type) {
          const tempTask: ITaskItem = {
            taskId: item.id,
            name: item.name,
            billable: true,
          };
          state.commonTask.push(tempTask);
        }
      });
      action.payload.filter((item: ITask) => {
        if (item.type) {
          const tempTask: ITaskItem = {
            taskId: item.id,
            name: item.name,
            billable: true,
          };
          state.ortherTask.push(tempTask);
        }
      });
    });
  builder
    .addCase(projectSave.fulfilled, (state, action) => {
      toast.success("Save project successfully");
      state.loading = false;
    })
    .addCase(projectSave.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(projectSave.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message);
    });
  builder
    .addCase(getDataEdit.rejected, (state, action) => {
      toast.error(action.error.message);
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(getDataEdit.fulfilled, (state, action) => {
      state.projectEdit = action.payload.result;
      state.listUserJoinProject = [];
      state.targetUserJoin = [];

      const targetProjectId = state.projectEdit.projectTargetUsers.map(
        (item) => item.userId
      );

      const usersId = state.projectEdit.users.map((item) => item.userId);

      //assign data to team

      state.listUserProject.forEach((item) => {
        if (usersId.includes(item.id)) {
          state.listUserJoinProject.push({
            ...item,
            users: {
              userId: item.id,
              type: state.projectEdit.users[usersId.indexOf(item.id)].type,
            },
          });
        }
      });
      state.listUserProject = state.listUserProject.filter(
        (user) => !usersId.includes(user.id)
      );

      state.projectEdit.tasks.forEach((task: ITaskItem) => {
        state.commonTask = state.commonTask.map((item) => {
          if (item.taskId === task.taskId)
            return { ...item, billable: task.billable };
          return item;
        });
      });

      state.targetUser.forEach((user: ITargetUser) => {
        if (targetProjectId.includes(user.userId)) {
          state.targetUserJoin.push({
            ...user,
            roleName:
              state.projectEdit.projectTargetUsers[
                targetProjectId.indexOf(user.userId)
              ].roleName,
          });

          state.projectEdit.projectTargetUsers.push({
            ...user,
            roleName:
              state.projectEdit.projectTargetUsers[
                targetProjectId.indexOf(user.userId)
              ].roleName,
          });
        }
      });
      state.targetUser = state.targetUser.filter(
        (user) => !targetProjectId.includes(user.userId)
      );
      state.loading = false;
    });
};
