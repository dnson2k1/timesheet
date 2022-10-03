import { Box } from "@mui/material";
import ProjectItem from "../ProjectItem";
import { useAppSelector } from "~/hooks/hooks";

import { IProject, IProjectList } from "~/interfaces/projectTypes";
import Loading from "../Loading/Loading";
var _ = require("lodash");
const ProjectList = () => {
  const { projectList, loading } = useAppSelector(
    (state) => state.manageProjectReducer
  );

  const clients = _.chain(projectList)
    // Group the elements of Array based on `customerName` property
    .groupBy("customerName")
    // `key` is group's name (customerName), `value` is the array of objects
    .map((value: IProject, key: string) => ({ customerName: key, list: value }))
    .value();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          {clients.slice(0, 5).map((proj: IProjectList, index: number) => (
            <ProjectItem projects={proj} key={index} />
          ))}
        </Box>
      )}
    </>
  );
};

export default ProjectList;
