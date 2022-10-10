import {
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";

import {
  Box,
  Button,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { PROJECT_STATUS, PROJECT_TYPES } from "~/enum";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";

import React, { useState } from "react";
import {
  activeProject,
  deleteProject,
  getAllProjects,
  getQuantityProjects,
  inActiveProject,
} from "~/redux/ManageProject/manageProjectThunk";

import { useStyles } from "../ProjectItem/productItemStyles";
import { IProject } from "~/interfaces/projectTypes";
import { changeIsEdit } from "~/redux/Project/projectSlice";
import CreateProject from "../ManageProjects/CreateProject";
import { getDataEdit, getUserNotPagging } from "~/redux/Project/projectThunk";
import View from "../View/View";
import { toast } from "react-toastify";

const moment = require("moment"); // require

type Props = {
  project: IProject;
};

const ProjectElement = ({ project }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [edit, setEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const { request } = useAppSelector((state) => state.manageProjectReducer);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const projectTypes = (type: PROJECT_TYPES) => {
    const newTypes = new Map([
      [0, "T&M"],
      [1, "FF"],
      [2, "NB"],
      [3, "ODC"],
      [5, "Prod"],
    ]);
    return newTypes.get(type);
  };

  const handleActive = async () => {
    dispatch(activeProject(project.id));
    await dispatch(getAllProjects(request));
    await dispatch(getQuantityProjects());
    toast.success("Active Project Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setAnchorEl(null);
  };
  const handleDeActive = async () => {
    dispatch(inActiveProject(project.id));
    await dispatch(getAllProjects(request));
    await dispatch(getQuantityProjects());
    toast.success("Deactive Project Successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    await dispatch(deleteProject(project.id));
    await dispatch(getAllProjects(request));
    await dispatch(getQuantityProjects());
    setAnchorEl(null);
  };
  const handleChangeEdit = async () => {
    setEdit(true);
    dispatch(changeIsEdit(true));
    await dispatch(getUserNotPagging());
    dispatch(getDataEdit(project.id));
    setAnchorEl(null);
  };
  const handleOpenView = () => {
    setOpenView(true);
    setAnchorEl(null);
    dispatch(getDataEdit(project.id));
  };

  return (
    <>
      <ListItem className={classes.listItem}>
        <Box className={classes.flex}>
          <Typography className={classes.listItemTypo}>
            {project.name}
          </Typography>
          <Typography className={classes.listItemTypo}>
            {project.pms.map((item, index) =>
              project.pms.length > 1 ? `${item} , ` : item
            )}
          </Typography>

          <Typography className={classes.listItemTypo}>
            {`${project.activeMember} member`}
          </Typography>
          <Typography className={classes.listItemTypo}>
            {projectTypes(project.projectType)}
          </Typography>
          <Typography className={classes.listItemTypo}>
            {moment(project.timeStart).format("YYYY/MM/DD")} -&nbsp;
            {moment(project.timeEnd).format("YYYY/MM/DD")}
          </Typography>
        </Box>

        {project.status === PROJECT_STATUS.ACTIVE ? (
          <Box className={classNames(classes.status, classes.status__active)}>
            Active
          </Box>
        ) : (
          <Box className={classNames(classes.status, classes.status__inactive)}>
            Inactive
          </Box>
        )}

        <Paper>
          <Button
            id="basic-button"
            className={classes.paperActions}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Actions &nbsp;
            <ChevronDownIcon width={20} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleChangeEdit}>
              <PencilIcon width={20} />
              <Typography component="span" marginLeft={2}>
                Edit
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleOpenView}>
              <EyeIcon width={20} />
              <Typography component="span" marginLeft={2}>
                View
              </Typography>
            </MenuItem>
            {project.status === PROJECT_STATUS.ACTIVE ? (
              <MenuItem onClick={handleDeActive}>
                <XMarkIcon width={20} />
                <Typography component="span" marginLeft={2}>
                  Deactive
                </Typography>
              </MenuItem>
            ) : (
              <MenuItem onClick={handleActive}>
                <CheckIcon width={20} />
                <Typography component="span" marginLeft={2}>
                  Active
                </Typography>
              </MenuItem>
            )}
            <MenuItem onClick={handleDelete}>
              <TrashIcon width={20} />
              <Typography component="span" marginLeft={2}>
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Paper>
      </ListItem>

      <CreateProject open={edit} setOpen={setEdit} />
      <View open={openView} setOpen={setOpenView} />
    </>
  );
};

export default ProjectElement;
