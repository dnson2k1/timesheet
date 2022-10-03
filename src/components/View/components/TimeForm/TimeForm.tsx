import React from "react";
import { TextField, Box, Button, FormControl } from "@mui/material";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useStyles } from "../Header/headerStyles";
import moment from "moment";
type Props = {
  handleChangeCustomTime: (startDate: string, endDate: string) => void;
  handleClose: () => void;
};
type TimeViewProject = {
  startDate: Date;
  endDate: Date;
};
const TimeForm = ({ handleChangeCustomTime, handleClose }: Props) => {
  const classes = useStyles();
  const methods = useForm<TimeViewProject>({});
  const onSubmit: SubmitHandler<TimeViewProject> = (data) => {
    handleClose();
    const start = String(moment(data.startDate).format("YYYY-MM-DD"));
    const end = String(moment(data.endDate).format("YYYY-MM-DD"));
    handleChangeCustomTime(start, end);
  };
  return (
    <>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box className={classes.input}>
                <Controller
                  name="startDate"
                  control={methods.control}
                  defaultValue={undefined}
                  render={({ field }) => (
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      label="From Date"
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          id="startDate"
                          variant="standard"
                          color="primary"
                          {...params}
                        />
                      )}
                    />
                  )}
                />
              </Box>
              <Box className={classes.input}>
                <Controller
                  name="endDate"
                  control={methods.control}
                  defaultValue={undefined}
                  render={({ field }) => (
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      label="To Date"
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          id="endDate"
                          variant="standard"
                          color="primary"
                          {...params}
                        />
                      )}
                    />
                  )}
                />
              </Box>
            </LocalizationProvider>
            <Box>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" type="submit" className={classes.ml}>
                Save
              </Button>
            </Box>
          </FormControl>
        </Box>
      </FormProvider>
    </>
  );
};

export default TimeForm;
