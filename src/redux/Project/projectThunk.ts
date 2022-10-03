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
    try {
      const res = await axiosInstance.get(
        "/api/services/app/User/GetUserNotPagging"
      );
      return res.data;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const projectSave = createAsyncThunk(
  "project/save",
  async (data: IDataForm) => {
    try {
      await axiosInstance.post("/api/services/app/Project/Save", data);
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getDataEdit = createAsyncThunk(
  "projectEdit/getData",
  async (id: number) => {
    try {
      const res = await axiosInstance.get("/api/services/app/Project/Get", {
        params: {
          input: id,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(String(error));
    }
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
      state.error = action.error as string;
      state.loading = false;
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
      state.error = action.error as string;
      state.loading = false;
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
      toast.error(action.error.message);
      state.loading = false;
    });
  builder
    .addCase(getDataEdit.rejected, (state, action) => {
      toast.error(action.error.message);
      state.loading = false;
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
      state.listUserProject.forEach((user) => {
        if (usersId.includes(user.id)) {
          state.listUserJoinProject.push({
            ...user,
            user: {
              userId: user.user?.userId,
              type: state.projectEdit.users[usersId.indexOf(user.id)].type,
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
        }
      });
      state.targetUser = state.targetUser.filter(
        (user) => !targetProjectId.includes(user.userId)
      );

      state.loading = false;
    });
};
