import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { ITimeStatisticMember } from "~/interfaces/viewProjectType";
import {
  billableTime,
  convertToHourAndMinute,
  percentCalc,
  totalWorkingTime,
} from "~/utils/viewProject";
import { useStyles } from "../../viewStyles";
import { LineProgress } from "../LineProgress/LineProgress";

type Props = {
  team: ITimeStatisticMember[];
};
const Team = ({ team }: Props) => {
  const classes = useStyles();
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderTitle}>Name</TableCell>
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
                {convertToHourAndMinute(totalWorkingTime(team))}
              </TableCell>
              <TableCell component="th" scope="row">
                <LineProgress
                  valueBuffer={totalWorkingTime(team)}
                  value={billableTime(team)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {convertToHourAndMinute(billableTime(team))}
                {percentCalc(billableTime(team), totalWorkingTime(team))}
              </TableCell>
            </TableRow>
            {!!team.length &&
              team.map((member, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    {member.userName}
                  </TableCell>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    {convertToHourAndMinute(member.totalWorkingTime)}
                  </TableCell>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    <LineProgress
                      valueBuffer={member.totalWorkingTime}
                      value={member.billableWorkingTime}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.tableBodyCell}
                    component="th"
                    scope="row"
                  >
                    {convertToHourAndMinute(member.billableWorkingTime)}{" "}
                    {percentCalc(
                      member.billableWorkingTime,
                      member.totalWorkingTime
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

export default Team;
