import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { timeSelect } from "~/Mockup/timeSelect";
import {
  viewTaskProject,
  viewTeamProject,
} from "~/redux/ViewProject/viewProjectThunk";
import TimeForm from "../TimeForm/TimeForm";
import { useStyles } from "./headerStyles";
const moment = require("moment");

const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [timeIndex, changeTimeIndex] = useState<number>(timeSelect[0].id);
  const [keyTime, setKeyTime] = useState<string>("weeks");
  let [startTime, changeStart] = useState<string>("");
  let [endTime, changeEnd] = useState<string>("");

  const { projectEdit } = useAppSelector((state) => state.projectReducer);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let start: string = "";
  let end: string = "";

  const handleChangeSelect = (e: any, id: number, value: string) => {
    changeTimeIndex(id);
    setKeyTime(value);

    if (id === 5) handleClickOpen();
  };

  const changeViewProject = () => {
    const request = {
      projectId: projectEdit.id as number,
      startDate: start,
      endDate: end,
    };
    dispatch(viewTaskProject(request));
    dispatch(viewTeamProject(request));
  };

  const handleChangeCustomTime = (startDate: string, endDate: string) => {
    changeStart(startDate);
    changeEnd(endDate);
    changeViewProject();
  };

  useEffect(() => {
    switch (timeIndex) {
      case 0:
        // set to the first day of this week
        start = String(moment().startOf("week").format("YYYY-MM-DD"));
        // set to the last day of this week
        end = String(moment().endOf("week").format("YYYY-MM-DD"));
        changeStart(start);
        changeEnd(end);
        changeViewProject();
        break;
      case 1:
        start = String(moment().startOf("month").format("YYYY-MM-DD"));
        end = String(moment().endOf("month").format("YYYY-MM-DD"));
        changeStart(start);
        changeEnd(end);
        changeViewProject();
        break;
      case 2:
        start = String(moment().startOf("quarter").format("YYYY-MM-DD"));
        end = String(moment().endOf("quarter").format("YYYY-MM-DD"));
        changeStart(start);
        changeEnd(end);
        changeViewProject();
        break;
      case 3:
        start = String(moment().startOf("year").format("YYYY-MM-DD"));
        end = String(moment().endOf("year").format("YYYY-MM-DD"));
        changeStart(start);
        changeEnd(end);
        changeViewProject();
        break;
      case 4:
        start = "";
        end = "";
        changeStart(start);
        changeEnd(end);
        changeViewProject();
        break;
    }
  }, [timeIndex, projectEdit.id]);

  const handleChangeTime = (amount: number) => {
    start = String(moment(startTime).add(amount, keyTime).format("YYYY-MM-DD"));
    changeStart(start);
    end = String(moment(endTime).add(amount, keyTime).format("YYYY-MM-DD"));
    changeEnd(end);
  };

  return (
    <>
      <Box className={classes.header}>
        <Box className={classes.header_flex}>
          <Box>
            <Button
              variant="outlined"
              onClick={() => {
                handleChangeTime(-1);
              }}
            >
              <ChevronLeftIcon width={25} />
            </Button>
            <Button
              variant="outlined"
              className={classes.ml}
              onClick={() => {
                handleChangeTime(1);
              }}
            >
              <ChevronRightIcon width={25} />
            </Button>
          </Box>
          {
            <Typography className={classes.text}>
              {timeSelect[timeIndex].title}
              {startTime && endTime && (
                <>
                  : {moment(startTime).format("DD MMM")}
                  {" - "}
                  {moment(endTime).format("DD MMM YYYY")}
                </>
              )}
            </Typography>
          }
        </Box>
        <Box className={classNames(classes.header_flex, classes.right)}>
          <Box sx={{ width: 250 }}>
            <FormControl fullWidth variant="outlined">
              <Select defaultValue={0}>
                {timeSelect.map((time, index) => (
                  <MenuItem
                    key={index}
                    value={time.id}
                    onClick={(event) =>
                      handleChangeSelect(
                        event,
                        time.id,
                        time.value ? time.value : ""
                      )
                    }
                  >
                    {time.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button className={classes.export}>Export</Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TimeForm
            handleClose={handleClose}
            handleChangeCustomTime={handleChangeCustomTime}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
