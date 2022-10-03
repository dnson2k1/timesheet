import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axiosInstance from "~/configs/axios";
import { FILTER_SELECTED, PROJECT_STATUS } from "~/enum";
import { IRequest, IStateManageProject } from "~/interfaces/manageProjectType";

export const getAllProjects = createAsyncThunk(
  "manageProject/getAll",
  async (req: IRequest) => {
    try {
      if (req.status !== FILTER_SELECTED.ALL_PROJECT) {
        const res = await axiosInstance.get(
          "/api/services/app/Project/GetAll",
          {
            params: req,
          }
        );
        return res.data.result;
      } else {
        const res = await axiosInstance.get(
          `/api/services/app/Project/GetAll`,
          {
            params: {
              status: undefined,
              search: req.search || undefined,
            },
          }
        );
        return res.data.result;
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getQuantityProjects = createAsyncThunk(
  "projects/getquantity",
  async () => {
    try {
      const response = await axiosInstance.get(
        `/api/services/app/Project/GetQuantityProject`
      );
      return response.data.result;
    } catch (error) {
      throw new Error(String(error)); //Chuyen qua Json, roi lay loi
    }
  }
);

export const deleteProject = createAsyncThunk(
  "manageProject/deleteProject",
  async (projectId: number) => {
    try {
      await axiosInstance.delete("/api/services/app/Project/Delete", {
        params: {
          Id: projectId,
        },
      });
      return projectId;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const inActiveProject = createAsyncThunk(
  "manageProject/inActiveProject",
  async (id: number) => {
    try {
      await axiosInstance.post("/api/services/app/Project/Inactive", { id });

      return id;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const activeProject = createAsyncThunk(
  "manageProject/activeProject",
  async (id: number) => {
    try {
      await axiosInstance.post("/api/services/app/Project/Active", {
        id,
      });
      return { id };
    } catch (error) {
      throw new Error(String(error));
    }
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
      state.error = action.error as string;
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
      state.error = action.error as string;
      state.loading = false;
    })
    .addCase(inActiveProject.fulfilled, (state, action) => {
      const findProject = state.projectList.find(
        (project) => project.id === action.payload
      );

      if (findProject) {
        findProject.status = PROJECT_STATUS.ACTIVE;
        toast.success("Deactive Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  builder
    .addCase(activeProject.pending, (state) => {
      state.loading = true;
    })
    .addCase(activeProject.rejected, (state, action) => {
      state.error = action.error as string;
      state.loading = false;
    })
    .addCase(activeProject.fulfilled, (state, action) => {
      const findProject = state.projectList.find(
        (project) => project.id === action.payload.id
      );
      if (findProject) {
        findProject.status = PROJECT_STATUS.INACTIVE;
        toast.success("Active Project Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
    .addCase(getQuantityProjects.rejected, (state) => {
      state.projectQuantities = [];
      state.loading = false;
    });
};
