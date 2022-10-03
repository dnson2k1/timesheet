import { extraReducersActionsManagerProject } from "./manageProjectThunk";
import { createSlice } from "@reduxjs/toolkit";
import { FILTER_SELECTED } from "~/enum";
import { IStateManageProject } from "~/interfaces/manageProjectType";
import { manageProjectActions } from "./manageProjectActions";

const initialState: IStateManageProject = {
  projectList: [],
  filterStatus: FILTER_SELECTED.ALL_PROJECT,
  request: { status: FILTER_SELECTED.ALL_PROJECT, search: "" },
  projectQuantities: [
    { status: 0, quantity: 0 },
    { status: 1, quantity: 0 },
  ],
  loading: false,
  error: "",
};

const manageProjectSlice = createSlice({
  name: "manageProject",
  initialState,
  reducers: manageProjectActions,
  extraReducers: extraReducersActionsManagerProject,
});

export const { changeFilter, changeRequestSearch, changeRequestType } =
  manageProjectSlice.actions;

const { reducer: manageProjectReducer } = manageProjectSlice;
export default manageProjectReducer;
