import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "~/configs/axios";
import { ICustomer, IStateCustomer } from "~/interfaces/customerType";

export const getAllCustomer = createAsyncThunk("customer/getAll", async () => {
  const res = await axiosInstance.get("/api/services/app/Customer/GetAll");
  return res.data;
});

export const createCustomer = createAsyncThunk(
  "customer/create",
  async ({ code, name, address }: ICustomer) => {
    const res = await axiosInstance.post("/api/services/app/Customer/Save", {
      code,
      name,
      address,
    });

    return res.data;
  }
);

export const extraReducersCustomer = (
  builder: ActionReducerMapBuilder<IStateCustomer>
) => {
  builder
    .addCase(getAllCustomer.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(getAllCustomer.fulfilled, (state, action) => {
      state.listCustomer = action.payload.result;
    });
  builder
    .addCase(createCustomer.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(createCustomer.fulfilled, (state, action) => {
      state.listCustomer.push(action.payload.result);
      toast.success("Add Customer Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
};
