import { extraReducerManageTask } from "./manageTaskThunk";
import { createSlice } from "@reduxjs/toolkit";
import { IStateTask } from "~/interfaces/taskTypes";

const initialState: IStateTask = {
  listTask: [],
  loading: false,
  error: "",
};

const manageTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: extraReducerManageTask,
});

export const { reducer: manageTaskReducer } = manageTaskSlice;

export default manageTaskReducer;
