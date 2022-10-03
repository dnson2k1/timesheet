import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import React from "react";
import { useStyles } from "~/components/View/viewStyles";
import { ITimeStatisticTask } from "~/interfaces/viewProjectType";
import {
  billableTime,
  convertToHourAndMinute,
  percentCalc,
  totalWorkingTime,
} from "~/utils/viewProject";
import { LineProgress } from "../../LineProgress/LineProgress";

type Props = {
  billableTasks: ITimeStatisticTask[];
};

const BillableTask = ({ billableTasks }: Props) => {
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
              <TableCell className={classes.tableHeaderTitle}>
                Billable Hours
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Total
              </TableCell>
              <TableCell component="th" scope="row">
                {/*Get Hours */}
                {convertToHourAndMinute(totalWorkingTime(billableTasks))}
              </TableCell>
              <TableCell component="th" scope="row">
                {/*Get Progress */}
                <LineProgress
                  valueBuffer={totalWorkingTime(billableTasks)}
                  value={billableTime(billableTasks)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {/*Get Hours */}
                {convertToHourAndMinute(billableTime(billableTasks))}

                {/*Get Percen */}
                {percentCalc(
                  billableTime(billableTasks),
                  totalWorkingTime(billableTasks)
                )}
              </TableCell>
            </TableRow>
            {billableTasks &&
              billableTasks.map((task) => (
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
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    <LineProgress
                      valueBuffer={task.totalWorkingTime}
                      value={task.billableWorkingTime}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    {convertToHourAndMinute(task.billableWorkingTime)}{" "}
                    {percentCalc(
                      task.billableWorkingTime,
                      task.totalWorkingTime
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BillableTask;
