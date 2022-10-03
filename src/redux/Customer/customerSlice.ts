import { IStateCustomer } from "./../../interfaces/customerType";
import { extraReducersCustomer } from "./customerThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IStateCustomer = {
  listCustomer: [],
  loading: false,
  error: "",
};

const custommerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: extraReducersCustomer,
});
const { reducer: customerReducer } = custommerSlice;
export default customerReducer;
