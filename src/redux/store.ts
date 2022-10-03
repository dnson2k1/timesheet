import loginReducer from "~/pages/Login/loginSlice";
import customerReducer from "~/redux/Customer/customerSlice";
import manageProjectReducer from "~/redux/ManageProject/manageProjectSlice";
import manageTaskReducer from "~/redux/ManageTask/manageTaskSlice";
import projectReducer from "~/redux/Project/projectSlice";
import viewProjectReducer from "~/redux/ViewProject/viewProjectSlice";

import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
  loginReducer,
  customerReducer,
  manageProjectReducer,
  manageTaskReducer,
  projectReducer,
  viewProjectReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
