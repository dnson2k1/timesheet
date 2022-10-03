import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { useStyles } from "./tasksStyles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { useEffect, useState } from "react";
import TaskItemArchive from "./TaskItemArchive";
import TaskItemDeArchive from "./TaskItemDeArchive";

import { useFormContext } from "react-hook-form";
import { getAllTask } from "~/redux/ManageTask/manageTaskThunk";
import {
  changeStatusAllCheck,
  changeStatusAllCheckFalse,
} from "~/redux/Project/projectSlice";
import { ITaskItem } from "~/interfaces/taskTypes";

const Task = () => {
  const dispatch = useAppDispatch();
  const { commonTask, ortherTask } = useAppSelector(
    (state) => state.projectReducer
  );

  const classes = useStyles();

  const [isAllCheck, setIsAllCheck] = useState<boolean>(true);

  const handleChangeCheckFalse = () => {
    dispatch(changeStatusAllCheckFalse());
    setIsAllCheck(false);
  };
  const handleChangeCheck = () => {
    dispatch(changeStatusAllCheck());
    setIsAllCheck(true);
  };
  useEffect(() => {
    dispatch(getAllTask());
  }, []);

  const methods = useFormContext();
  useEffect(() => {
    methods.setValue(
      "tasks",
      commonTask.map((item) => ({
        taskId: item.taskId,
        billable: item.billable,
      }))
    );
  }, [commonTask, methods]);

  return (
    <Box className={classes.task}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.thead}>
            <tr style={{ padding: 10 }}>
              <td className="text">
                <p>Tasks</p>
                <p>Billable</p>
              </td>
              <td>
                {isAllCheck ? (
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    checked={isAllCheck}
                    onChange={handleChangeCheckFalse}
                  />
                ) : (
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    checked={isAllCheck}
                    onChange={handleChangeCheck}
                  />
                )}
              </td>
            </tr>
          </TableHead>
          <TableBody>
            <tr>
              {!!commonTask.length &&
                commonTask.map((task: ITaskItem) => (
                  <TaskItemDeArchive task={task} key={task?.taskId} />
                ))}
            </tr>
          </TableBody>
        </Table>
      </TableContainer>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ChevronUpIcon />}
          aria-controls="panel2a-content"
        >
          <p className={classes.title}>Select task</p>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div>
            {!!ortherTask.length &&
              ortherTask.map((task: ITaskItem) => (
                <TaskItemArchive task={task} key={task?.taskId} />
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Task;
