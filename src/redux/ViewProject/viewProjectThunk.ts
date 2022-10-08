import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "~/configs/axios";
import { IStateView, ViewProjectRequest } from "~/interfaces/viewProjectType";

export const viewTaskProject = createAsyncThunk(
  "projects/view/task",
  async (request: ViewProjectRequest) => {
    const response = await axiosInstance.get(
      `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks`,
      {
        params: request,
      }
    );
    return response.data.result;
  }
);

export const viewTeamProject = createAsyncThunk(
  "projects/view/team",
  async (request: ViewProjectRequest) => {
    const response = await axiosInstance.get(
      `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams`,
      {
        params: request,
      }
    );
    return response.data.result;
  }
);

export const extraReducerViewProject = (
  builder: ActionReducerMapBuilder<IStateView>
) => {
  builder
    .addCase(viewTaskProject.fulfilled, (state, action) => {
      state.timeStatisticTasks = action.payload;
    })
    .addCase(viewTaskProject.rejected, (state, action) => {
      state.timeStatisticTasks = [];
      toast.error(action.error.message);
    });
  builder
    .addCase(viewTeamProject.fulfilled, (state, action) => {
      state.timeStatisticMembers = action.payload;
    })
    .addCase(viewTeamProject.rejected, (state, action) => {
      state.timeStatisticMembers = [];
      toast.error(action.error.message);
    });
};
