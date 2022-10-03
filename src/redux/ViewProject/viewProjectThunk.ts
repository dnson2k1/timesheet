import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/configs/axios";
import { IStateView, ViewProjectRequest } from "~/interfaces/viewProjectType";

export const viewTaskProject = createAsyncThunk(
  "projects/view/task",
  async (request: ViewProjectRequest) => {
    try {
      const response = await axiosInstance.get(
        `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTasks`,
        {
          params: request,
        }
      );
      return response.data.result;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const viewTeamProject = createAsyncThunk(
  "projects/view/team",
  async (request: ViewProjectRequest) => {
    try {
      const response = await axiosInstance.get(
        `/api/services/app/TimeSheetProject/GetTimeSheetStatisticTeams`,
        {
          params: request,
        }
      );
      return response.data.result;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const extraReducerViewProject = (
  builder: ActionReducerMapBuilder<IStateView>
) => {
  builder
    .addCase(viewTaskProject.fulfilled, (state, action) => {
      state.timeStatisticTasks = action.payload;
    })
    .addCase(viewTaskProject.rejected, (state) => {
      state.timeStatisticTasks = [];
    });
  builder
    .addCase(viewTeamProject.fulfilled, (state, action) => {
      state.timeStatisticMembers = action.payload;
    })
    .addCase(viewTeamProject.rejected, (state) => {
      state.timeStatisticMembers = [];
    });
};
