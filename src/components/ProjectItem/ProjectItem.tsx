import { Box, List, ListSubheader } from "@mui/material";
import { IProjectList } from "~/interfaces/projectTypes";
import ProjectElement from "../ProjectElement";

import { useStyles } from "./productItemStyles";

type Props = {
  projects: IProjectList;
};

const ProjectItem = ({ projects }: Props) => {
  const classes = useStyles();

  return (
    <Box>
      <Box>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              className={classes.listSubHeader}
            >
              {projects.customerName}
            </ListSubheader>
          }
        >
          {projects.list.map((item) => (
            <ProjectElement project={item} key={item.id} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ProjectItem;
