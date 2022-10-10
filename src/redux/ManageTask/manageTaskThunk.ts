import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "~/configs/axios";
import { IStateTask, ITask } from "~/interfaces/taskTypes";

export const getAllTask = createAsyncThunk("manageTask/getAll", async () => {
  try {
    const res = await axiosInstance.get("/api/services/app/Task/GetAll");
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
});

export const deArchiveTask = createAsyncThunk(
  "manageTask/deArchiveTask",
  async (id?: number) => {
    try {
      const res = await axiosInstance.post("/api/services/app/Task/DeArchive", {
        id,
      });

      return { id, data: res.data };
    } catch (error) {
      throw Error(String(error));
    }
  }
);
export const archiveTask = createAsyncThunk(
  "manageTask/archiveTask",
  async (id?: number) => {
    try {
      const res = await axiosInstance.delete("/api/services/app/Task/Archive", {
        params: {
          Id: id,
        },
      });
      return { id, data: res.data };
    } catch (error) {
      throw Error(String(error));
    }
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: number) => {
    try {
      await axiosInstance.delete(`/api/services/app/Task/Delete`, {
        params: {
          Id: id,
        },
      });
      return id;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const saveTask = createAsyncThunk("tasks/save", async (task: ITask) => {
  try {
    const response = await axiosInstance.post(
      `/api/services/app/Task/Save`,
      task
    );
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
});

export const extraReducerManageTask = (
  builder: ActionReducerMapBuilder<IStateTask>
) => {
  builder
    .addCase(getAllTask.fulfilled, (state, action) => {
      state.listTask = action.payload;
      state.loading = false;
    })
    .addCase(getAllTask.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase(getAllTask.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        listTask: [] as ITask[],
      };
    });

  builder
    .addCase(deleteTask.fulfilled, (state, action) => {
      const updatedTaskList: ITask[] = state.listTask.filter(
        (task) => task.id !== action.payload
      );
      toast.success("Delete task successfully");
      return {
        ...state,
        isLoading: false,
        listTask: updatedTaskList,
        TaskListDisplay: updatedTaskList,
      };
    })
    .addCase(deleteTask.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase(deleteTask.rejected, (state, action) => {
      toast.error(
        `This taskId ${action.meta.arg} is in a project ,You can't delete task`
      );
      return {
        ...state,
        isLoading: false,
      };
    });
  builder
    .addCase(saveTask.fulfilled, (state, action) => {
      const newTask: ITask = action.payload || ({} as ITask);
      toast.success("Save task successfully");
      return {
        ...state,
        isLoading: false,
        listTask: [...state.listTask, newTask],
        TaskListDisplay: [...state.listTask, newTask],
      };
    })
    .addCase(saveTask.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase(saveTask.rejected, (state, action) => {
      toast.error(`Task is ${action.meta.arg.name} already exist`);
      return {
        ...state,
        isLoading: false,
      };
    });
};
