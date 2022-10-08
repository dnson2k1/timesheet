import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axiosInstance from "~/configs/axios";
import { FILTER_SELECTED, PROJECT_STATUS } from "~/enum";
import { IRequest, IStateManageProject } from "~/interfaces/manageProjectType";

export const getAllProjects = createAsyncThunk(
  "manageProject/getAll",
  async (req: IRequest) => {
    if (req.status !== FILTER_SELECTED.ALL_PROJECT) {
      const res = await axiosInstance.get("/api/services/app/Project/GetAll", {
        params: req,
      });
      return res.data.result;
    } else {
      const res = await axiosInstance.get(`/api/services/app/Project/GetAll`, {
        params: {
          status: undefined,
          search: req.search || undefined,
        },
      });
      return res.data.result;
    }
  }
);

export const getQuantityProjects = createAsyncThunk(
  "projects/getquantity",
  async () => {
    const response = await axiosInstance.get(
      `/api/services/app/Project/GetQuantityProject`
    );
    return response.data.result;
  }
);

export const deleteProject = createAsyncThunk(
  "manageProject/deleteProject",
  async (projectId: number) => {
    await axiosInstance.delete("/api/services/app/Project/Delete", {
      params: {
        Id: projectId,
      },
    });
    return projectId;
  }
);

export const inActiveProject = createAsyncThunk(
  "manageProject/inActiveProject",
  async (id: number) => {
    await axiosInstance.post("/api/services/app/Project/Inactive", { id });

    return id;
  }
);
export const activeProject = createAsyncThunk(
  "manageProject/activeProject",
  async (id: number) => {
    await axiosInstance.post("/api/services/app/Project/Active", {
      id,
    });
    return { id };
  }
);

export const extraReducersActionsManagerProject = (
  builder: ActionReducerMapBuilder<IStateManageProject>
) => {
  builder
    .addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllProjects.fulfilled, (state, action) => {
      state.projectList = action.payload;
      state.loading = false;
    })
    .addCase(getAllProjects.rejected, (state, action) => {
      state.error = action.error.message as string;
      toast.error(action.error.message);
    });
  builder

    .addCase(deleteProject.fulfilled, (state, action) => {
      const id = action.payload;
      state.projectList = state.projectList.filter((item) => item.id !== id);
      state.loading = false;
      toast.success("Delete project success");
    })
    .addCase(deleteProject.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      toast.error(action.error.message);
    });
  builder
    .addCase(inActiveProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(inActiveProject.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(inActiveProject.fulfilled, (state, action) => {
      const findProject = state.projectList.find(
        (project) => project.id === action.payload
      );

      if (findProject) {
        findProject.status = PROJECT_STATUS.ACTIVE;
      }
    });
  builder
    .addCase(activeProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(activeProject.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
      toast.error(action.error.message);
    })
    .addCase(activeProject.fulfilled, (state, action) => {
      const findProject = state.projectList.find(
        (project) => project.id === action.payload.id
      );
      if (findProject) {
        findProject.status = PROJECT_STATUS.INACTIVE;
      }
    });
  builder
    .addCase(getQuantityProjects.pending, (state) => {
      state.loading = true;
    })
    .addCase(getQuantityProjects.fulfilled, (state, action) => {
      state.projectQuantities = action.payload;
      state.loading = false;
    })
    .addCase(getQuantityProjects.rejected, (state, action) => {
      state.projectQuantities = [];
      state.error = action.error.message as string;
      toast.error(action.error.message);
    });
};
