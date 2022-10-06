import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useStyles } from "./teamStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

import Search from "./components/Search/Search";
import Filters from "./components/Filters/Filters";
import Member from "./components/Member";
import { useAppSelector } from "~/hooks/hooks";
import { BRANCH_USER, TEAM_TYPE, TYPE_USER } from "~/enum";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFormContext } from "react-hook-form";

const Team = () => {
  const classes = useStyles();
  const { commonTask } = useAppSelector((state) => state.projectReducer);
  const {
    listUserProject,
    filters,
    searchValueMember,
    searchValueTeam,
    listUserJoinProject,
  } = useAppSelector((state) => state.projectReducer);

  const { branch, type } = filters;

  const [activeMember, setActiveMember] = useState(false);

  const newList = useMemo(
    () =>
      listUserProject
        .filter(
          (user) =>
            user.name
              .toUpperCase()
              .includes(searchValueMember.trim().toUpperCase()) ||
            user.emailAddress
              .toUpperCase()
              .includes(searchValueMember.trim().toUpperCase())
        )
        .filter((user) => {
          return branch === BRANCH_USER.All || user.branch === branch;
        })
        .filter((user) => {
          return TYPE_USER.All === type || user.type === type;
        }),
    [branch, type, searchValueMember, listUserProject]
  );

  const searchListUserJoinProject = useMemo(
    () =>
      listUserJoinProject
        .filter(
          (user) =>
            user.name
              .toUpperCase()
              .includes(searchValueTeam.trim().toUpperCase()) ||
            user.emailAddress
              .toUpperCase()
              .includes(searchValueTeam.trim().toUpperCase())
        )
        .filter((item) => {
          return !activeMember || item.users.type === TEAM_TYPE.Deactive;
        }),
    [searchValueTeam, listUserJoinProject, activeMember]
  );
  const methods = useFormContext();

  useEffect(() => {
    methods.setValue(
      "users",
      listUserJoinProject.map((item) => ({
        userId: item.users.userId,
        type: item.users.type,
      }))
    );
  }, [listUserJoinProject, methods]);

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
    <div>
      <div className={classes.according}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Team</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={classes.team__Left}>
              <Box className={classes.check}>
                <input
                  type="Checkbox"
                  className={classes.checkbox}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setActiveMember(e.target.checked)
                  }
                />
                <Typography>Show Deactive Member</Typography>
              </Box>
              <Search type="addMember" />
            </Box>
            {/* {(projectEdit ?searchListUserJoinProject : listUserProjectEdit )} */}
            {!!searchListUserJoinProject.length &&
              searchListUserJoinProject.map((user) => (
                <Member
                  user={user}
                  iconLeft={<XMarkIcon width={25} cursor="pointer" />}
                  iconRight={<ChevronRightIcon width={25} cursor="pointer" />}
                  isSelect
                />
              ))}
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              Select team number
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Filters />
              {!!newList.length &&
                newList.slice(0, 40).map((user) => <Member user={user} />)}
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Team;
