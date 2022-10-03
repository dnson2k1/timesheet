import { PayloadAction } from "@reduxjs/toolkit";
import { FILTER_SELECTED } from "~/enum";
import { IStateManageProject } from "~/interfaces/manageProjectType";

export const manageProjectActions = {
  changeFilter: (
    state: IStateManageProject,
    action: PayloadAction<FILTER_SELECTED>
  ) => {
    state.filterStatus = action.payload;
  },

  changeRequestType: (
    state: IStateManageProject,
    action: PayloadAction<FILTER_SELECTED>
  ) => {
    state.request.status = action.payload;
  },
  changeRequestSearch: (
    state: IStateManageProject,
    action: PayloadAction<string>
  ) => {
    state.request.search = action.payload;
  },
};
