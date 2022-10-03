import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useStyles } from "~/components/View/viewStyles";
import { ITimeStatisticTask } from "~/interfaces/viewProjectType";
import { convertToHourAndMinute, totalWorkingTime } from "~/utils/viewProject";

type Props = {
  nonBillableTasks: ITimeStatisticTask[];
};

const NonBillableTask = ({ nonBillableTasks }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.table}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderTitle}>
                Billable Tasks
              </TableCell>
              <TableCell className={classes.tableHeaderTitle}>Hours</TableCell>
              <TableCell className={classes.tableHeaderTitle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell component="th" scope="row">
                {convertToHourAndMinute(totalWorkingTime(nonBillableTasks))}
              </TableCell>
            </TableRow>
            {!!nonBillableTasks.length &&
              nonBillableTasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    {task.taskName}
                  </TableCell>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    {convertToHourAndMinute(task.totalWorkingTime)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NonBillableTask;
