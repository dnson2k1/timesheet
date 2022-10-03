import { TEAM_TYPE } from "~/enum";

export type ITeamType = {
  id: number;
  type: string;
  value: TEAM_TYPE;
};

export const teamType: ITeamType[] = [
  {
    id: 0,
    type: "Member ",
    value: TEAM_TYPE.Member,
  },
  {
    id: 1,
    type: "Project Manager ",
    value: TEAM_TYPE.ProjectManager,
  },
  {
    id: 2,
    type: "Shadow ",
    value: TEAM_TYPE.Shadow,
  },
  {
    id: 3,
    type: "Deactive ",
    value: TEAM_TYPE.Deactive,
  },
];
