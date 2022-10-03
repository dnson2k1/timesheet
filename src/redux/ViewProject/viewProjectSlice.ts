import { createSlice } from "@reduxjs/toolkit";
import { IStateView } from "~/interfaces/viewProjectType";
import { extraReducerViewProject } from "./viewProjectThunk";

const initialState: IStateView = {
  timeStatisticTasks: [],
  timeStatisticMembers: [],
};

const viewProjectSlice = createSlice({
  name: "view-project",
  initialState,
  reducers: {},
  extraReducers: extraReducerViewProject,
});

const { reducer: viewProjectReducer } = viewProjectSlice;
export default viewProjectReducer;
