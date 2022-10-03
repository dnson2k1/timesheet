import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "~/redux/store";
import { act, render } from "@testing-library/react";
import ProjectElement from "../ProjectElement";
import { IStateManageProject } from "~/interfaces/manageProjectType";
import { FILTER_SELECTED } from "~/enum";
import ProjectList from "../ProjectList";
import manageProjectReducer, {
  changeRequestSearch,
  changeRequestType,
} from "~/redux/ManageProject/manageProjectSlice";

interface Props {
  component: React.ReactNode;
  route: string;
}

const IStateManage: IStateManageProject = {
  projectList: [],
  filterStatus: FILTER_SELECTED.ALL_PROJECT,
  request: { status: 0, search: "" },
  projectQuantities: [],
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

const renderWithProps = ({ component, route }: Props) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{component}</MemoryRouter>
    </Provider>
  );

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
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      renderWithProps({
        component: <ProjectElement project={fakeProject} />,
        route: route,
      });
    });
  });
});
describe("Project Change Search", () => {
  it("should be search project by client or name", () => {
    const route = `/app/main/projects`;
    const search = "Sang";
    // eslint-disable-next-line testing-library/no-unnecessary-act
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
    // eslint-disable-next-line testing-library/no-unnecessary-act
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
