import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import General from "./General";
import Tasks from "./Tasks";
import Team from "./Team";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { FormProvider, useForm } from "react-hook-form";
import { IDataForm } from "~/interfaces/projectTypes";
import Notification from "./Notification/Notification";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { projectSave } from "~/redux/Project/projectThunk";
import { formatDate } from "~/utils/convertDay";
import { changeIsEdit, resetProjectForm } from "~/redux/Project/projectSlice";
import TargerUser from "./TargerUser";
import {
  getAllProjects,
  getQuantityProjects,
} from "~/redux/ManageProject/manageProjectThunk";
import Loading from "~/components/Loading/Loading";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },

  "& .MuiPaper-root": {
    minWidth: `80%`,
    minHeight: "90% !important",
  },

  "&": {
    marginTop: "45px",
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <LockClosedIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const schema = yup.object().shape({
  customerId: yup.number().required("Project customer is required!"),
  name: yup.string().required("Project name is required!"),
  code: yup.string().required("Project code is required!"),
  timeStart: yup
    .date()
    .required("Project time start is required!")
    .nullable()
    .max(yup.ref("timeEnd"), "Time start must be after Time start"),

  timeEnd: yup
    .date()
    .required("Project time end is required!")
    .nullable()
    .min(yup.ref("timeStart"), "Time end must be after Time start"),

  note: yup.string(),
  projectType: yup.number().required(),
  users: yup.array().of(
    yup.object().shape({
      userId: yup.number(),
      type: yup.number(),
      id: yup.number(),
    })
  ),
});

const CreateProject = ({ open, setOpen }: Props) => {
  const [value, setValue] = React.useState(0);
  const { request } = useAppSelector((state) => state.manageProjectReducer);

  const dispatch = useAppDispatch();
  const { projectEdit, isEdit, loading } = useAppSelector(
    (state) => state.projectReducer
  );

  const methods = useForm<IDataForm>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(changeIsEdit(false));
    dispatch(resetProjectForm());
    setValue(0);
  };

  const onSubmitForm = async (data: IDataForm) => {
    const listUsers = methods.getValues("users");
    const isUserType = listUsers?.map((item) => item.type);
    if (!methods.getValues("users").length) {
      toast.error(
        "Need at least one member in project (add member in tab team)",
        {
          position: "top-center",
          autoClose: 4000,
        }
      );
      return;
    }
    if (!isUserType.includes(1)) {
      toast.error("Need at least one member is project manager", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    setOpen(false);
    dispatch(resetProjectForm());
    dispatch(changeIsEdit(false));
    await dispatch(
      projectSave({
        ...data,
        timeStart: formatDate(data.timeStart),
        timeEnd: formatDate(data.timeEnd),
      })
    );
    await dispatch(getAllProjects(request));
    await dispatch(getQuantityProjects());

    setValue(0);
  };

  const isTargetUser = projectEdit.users?.map((item) => item.type);
  useEffect(() => {
    projectEdit && methods.reset(projectEdit);
  }, [projectEdit, methods]);

  return (
    <>
      <Box>
        <BootstrapDialog open={open} onClose={handleClose}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {!projectEdit.id
              ? "New Project"
              : `Edit Project - ${projectEdit.name}`}
          </BootstrapDialogTitle>

          <DialogContent>
            <FormProvider {...methods}>
              {loading ? (
                <Loading />
              ) : (
                <form>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="General" {...a11yProps(0)} />
                        <Tab label="Team" {...a11yProps(1)} />
                        <Tab label="Task" {...a11yProps(2)} />

                        <Tab label="Notification" {...a11yProps(3)} />
                        {isEdit &&
                          projectEdit.id &&
                          isTargetUser.includes(2) && (
                            <Tab label="Target Users" {...a11yProps(4)} />
                          )}
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <General />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Team />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <Tasks />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <Notification />
                    </TabPanel>
                    {isEdit && projectEdit.id && isTargetUser.includes(2) && (
                      <TabPanel value={value} index={4}>
                        <TargerUser />
                      </TabPanel>
                    )}
                  </Box>
                </form>
              )}
            </FormProvider>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={methods.handleSubmit(onSubmitForm)}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </>
  );
};

export default CreateProject;
