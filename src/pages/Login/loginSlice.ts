import { removeToken, setToken } from "./../../utils/localStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IDataLogin, IStateLogin } from "./typeLogin";
import axiosInstance from "~/configs/axios";

const initialState: IStateLogin = {
  accessToken: "",
  loading: false,
  error: "",
  user: {
    id: 0,
    name: "",
    surname: "",
    userName: "",
    emailAddress: "",
    avatarPath: "",
  },
};

export const loginAuth = createAsyncThunk(
  "auth/Login",
  async (
    { userNameOrEmailAddress, password, rememberClient }: IDataLogin,
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.post("/api/TokenAuth/Authenticate", {
        userNameOrEmailAddress,
        password,
        rememberClient,
      });

      return res.data;
    } catch (error) {
      throw Error(String(error));
    }
  }
);

export const getUser = createAsyncThunk("user/Login", async () => {
  try {
    const res = await axiosInstance.get(
      "/api/services/app/Session/GetCurrentLoginInformations"
    );
    return res.data.result.user;
  } catch (error) {
    throw Error(String(error));
  }
});

const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.accessToken = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.rejected, (state, action) => {
        state.error = action.error as string;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.accessToken = action.payload.result.accessToken;
        setToken(state.accessToken as string);
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error as string;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { logoutSuccess } = loginSlice.actions;

const { reducer: loginReducer } = loginSlice;
export default loginReducer;
