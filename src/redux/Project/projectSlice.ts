import { extraReducersProject } from "./projectThunk";
import { IDataForm, IStateProject } from "./../../interfaces/projectTypes";
import { createSlice } from "@reduxjs/toolkit";
import { projectActions } from "./projectActions";

const initialState: IStateProject = {
  listUserProject: [],
  listUserJoinProject: [],
  userMemberType: [],
  loading: false,
  searchValueMember: "",
  searchValueTeam: "",
  error: "",
  filters: { branch: 0, type: 0 },
  isEdit: false,
  projectEdit: {} as IDataForm,
  targetUser: [],
  targetUserJoin: [],
  commonTask: [],
  ortherTask: [],
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: projectActions,
  extraReducers: extraReducersProject,
});
export const {
  changeFilterBranchMember,
  changeFilterTypeMember,
  changeSearchValueMember,
  addMemberJoinProject,
  removeJoinProject,
  changeSearchValueTeam,
  changeMemberType,
  changeIsEdit,
  addTargetUserToProject,
  removeTargetUserFromProject,
  changeRoleTargetUser,
  resetProjectForm,
  changeStatusAllCheck,
  addToOtherTasks,
  changeStatusAllCheckFalse,
  addToCommonTasks,
  changeStatusCheck,
} = projectSlice.actions;
const { reducer: projectReducer } = projectSlice;

export default projectReducer;
