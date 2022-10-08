/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-unnecessary-act */
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "~/redux/store";
import { act, render, screen, waitFor } from "@testing-library/react";
import ProjectElement from "../ProjectElement";
import { IStateManageProject } from "~/interfaces/manageProjectType";
import { FILTER_SELECTED } from "~/enum";
import ProjectList from "../ProjectList";
import manageProjectReducer, {
  changeRequestSearch,
  changeRequestType,
} from "~/redux/ManageProject/manageProjectSlice";
import { IDataForm, IStateProject } from "~/interfaces/projectTypes";

import { FormProvider, useForm } from "react-hook-form";
import General from "./CreateProject/General";
import userEvent from "@testing-library/user-event";
import { IStateCustomer } from "~/interfaces/customerType";
import { IStateTask } from "~/interfaces/taskTypes";
import Tasks from "./CreateProject/Tasks";
import Team from "./CreateProject/Team";
import projectReducer, {
  changeSearchValueTeam,
} from "~/redux/Project/projectSlice";
import NewClient from "./CreateProject/General/NewClient";

interface Props {
  component: React.ReactNode;
  route: string;
}
const IProject: IStateProject = {
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
const IStateManage: IStateManageProject = {
  projectList: [],
  filterStatus: FILTER_SELECTED.ALL_PROJECT,
  request: { status: 0, search: "" },
  projectQuantities: [],
  loading: false,
  error: "",
};
const ICustomer: IStateCustomer = {
  listCustomer: [],
  loading: false,
  error: "",
};
const ITasks: IStateTask = {
  listTask: [],
  loading: false,
  error: "",
};
let container: HTMLElement | null = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container as Element);
  container?.remove();
  container = null;
});
const Wrapper = ({ children }: { children: JSX.Element }) => {
  const methods = useForm<IDataForm>();
  return <FormProvider {...methods}>{children}</FormProvider>;
};
const renderWithProps = ({ component, route }: Props) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    </Provider>
  );

describe("Delete project", () => {
  it("should delete correct project item", async () => {
    const route = "/app/main/projects";
    const fakeProject = {
      Id: 69,
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeProject),
      } as Response)
    );
    await act(async () => {
      renderWithProps({
        component: <ProjectList />,
        route: route,
      });
    });
  });
});

describe("Client", () => {
  it("Get clients", async () => {
    const route = "/app/main/projects";
    const open = true;
    const setOpen = (value: boolean) => {
      return value;
    };
    const fakeProject = {
      name: "Client 1",
      code: "AAA",
      id: 1,
      address: "",
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeProject),
      } as Response)
    );
    await act(async () => {
      renderWithProps({
        component: <NewClient open={open} setOpen={setOpen} />,
        route: route,
      });
    });
  });
});

describe("Project Item", () => {
  it("should render correct project item", async () => {
    const route = "/app/main/projects";
    const fakeProject = {
      activeMember: 1,
      code: "Sang Dang Ngoc",
      customerName: "Client 1",
      id: 1,
      name: "Project Name",
      pms: ["Dang Ngoc Sang"],
      projectType: 1,
      status: 1,
      timeEnd: new Date("2022-08-31T17:00:00+07:00"),
      timeStart: new Date("2022-08-01T17:00:00+07:00"),
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeProject),
      } as Response)
    );
    await act(async () => {
      renderWithProps({
        component: <ProjectElement project={fakeProject} />,
        route: route,
      });
    });
  });
});

describe("Search value in tab Team", () => {
  it("should be search team by client or name in tab Team", () => {
    const route = `/app/main/projects`;
    const search = "Trung Đức Đỗ";
    act(() => {
      renderWithProps({
        component: (
          <Wrapper>
            <Team />
          </Wrapper>
        ),
        route: route,
      });
    });
    expect(projectReducer(IProject, changeSearchValueTeam(search))).toEqual({
      ...IProject,
      searchValueTeam: search,
    });
  });
});

describe("Project Change Search", () => {
  it("should be search project by client or name", () => {
    const route = `/app/main/projects`;
    const search = "Sang";
    act(() => {
      renderWithProps({ component: <ProjectList />, route: route });
    });
    expect(
      manageProjectReducer(IStateManage, changeRequestSearch(search))
    ).toEqual({
      ...IStateManage,
      request: {
        ...IStateManage.request,
        search,
      },
    });
  });
});

describe("Project Change Type", () => {
  it("should be change type project", () => {
    const route = `/app/main/projects`;
    const type = 1;
    act(() => {
      renderWithProps({ component: <ProjectList />, route: route });
    });
    expect(manageProjectReducer(IStateManage, changeRequestType(type))).toEqual(
      {
        ...IStateManage,
        request: {
          ...IStateManage.request,
          status: type,
        },
      }
    );
  });
});

describe("Project Form", () => {
  it("check required General", async () => {
    const Wrapper = ({ children }: { children: JSX.Element }) => {
      const formMethods = useForm<IDataForm>();
      return <FormProvider {...formMethods}>{children}</FormProvider>;
    };
    act(() => {
      renderWithProps({
        component: (
          <Wrapper>
            <General />
          </Wrapper>
        ),
        route: "/app/main/projects/create/general",
      });
    });
    const projectName = screen.getByText(/Project Name/i);
    const projectCode = screen.getByText(/Project Code/i);
    act(() => {
      userEvent.type(projectName, "");
      userEvent.type(projectCode, "");
    });
    act(async () => {
      await waitFor(() => {
        expect(
          screen.getByText(/Project name is required/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Project code is a required/i)
        ).toBeInTheDocument();
      });
    });
  });

  it("get customer list", async () => {
    const fakeClients = [{ name: "Client 1", id: 1, code: "12312312" }];
    ICustomer.listCustomer = fakeClients;
    act(() => {
      renderWithProps({
        component: (
          <Wrapper>
            <General />
          </Wrapper>
        ),
        route: "/app/main/projects/create/general",
      });
    });
    act(async () => {
      await waitFor(() => {
        expect(store.getState().customerReducer.listCustomer).toBe(fakeClients);
      });
    });
  });
});

describe("Tasks manager", () => {
  it("Get all tasks", async () => {
    const fakeData = [{ id: 1, name: "Test", isDeleted: false, type: 1 }];
    ITasks.listTask = fakeData;
    act(() => {
      renderWithProps({
        component: (
          <Wrapper>
            <Tasks />
          </Wrapper>
        ),
        route: "/app/main/projects/create/tasks",
      });
    });
    act(async () => {
      await waitFor(() => {
        expect(store.getState().manageTaskReducer.listTask).toBe(fakeData);
      });
    });
  });
});
