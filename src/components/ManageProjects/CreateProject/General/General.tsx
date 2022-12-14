import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { MenuProps, useStyles } from "./generalStyles";
import classNames from "classnames";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Controller } from "react-hook-form";

import React, { useEffect, useState } from "react";
import NewClient from "./NewClient/NewClient";

import { useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { getAllCustomer } from "~/redux/Customer/customerThunk";
import { IDataForm } from "~/interfaces/projectTypes";

type Props = {
  project?: IDataForm;
};

const General = ({ project }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { listCustomer } = useAppSelector((state) => state.customerReducer);
  const [open, setOpen] = useState(false);
  const { register } = useFormContext();

  const methods = useFormContext<IDataForm>();

  useEffect(() => {
    dispatch(getAllCustomer());
  }, []);

  return (
    <>
      <Box>
        <Box className={classes.general}>
          <Box className={classes.generalItems}>
            <Box className={classes.generalItem}>
              <Typography className={classes.label}>Client*</Typography>

              <Controller
                name="customerId"
                control={methods.control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      displayEmpty
                      MenuProps={MenuProps}
                      value={field.value || 0}
                      renderValue={(value) =>
                        !!value ? (
                          `client ${value}`
                        ) : (
                          <option>Choose a client...</option>
                        )
                      }
                      onChange={(value) => field.onChange(value)}
                      error={!!methods.formState.errors.customerId}
                    >
                      {listCustomer.map((client) => (
                        <MenuItem key={client.id} value={client.id}>
                          {client.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
            <Box>
              <Button className={classes.button} onClick={() => setOpen(true)}>
                + New Client
              </Button>
            </Box>
          </Box>

          <Box className={classes.generalItems}>
            <Box className={classes.generalItem}>
              <Typography className={classes.label}>Project name*</Typography>
              <Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="name"
                  {...register("name")}
                />
                {!!methods.formState.errors.name && (
                  <Typography className={classes.error}>
                    {methods.formState.errors.name.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={classes.generalItems}>
            <Box className={classes.generalItem}>
              <Typography className={classes.label}>Project code*</Typography>
              <Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="projectCode"
                  {...register("code")}
                />
                {!!methods.formState.errors.code && (
                  <Typography className={classes.error}>
                    {methods.formState.errors.code.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={classes.generalItems}>
            <Box className={classes.generalItem}>
              <Typography className={classes.label}>Date*</Typography>
              <Box className={classes.date}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box>
                    <Controller
                      name="timeStart"
                      control={methods.control}
                      defaultValue={new Date("")}
                      render={({ field }) => (
                        <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          label="Start at"
                          {...field}
                          renderInput={(params) => (
                            <TextField
                              id="timeStart"
                              variant="outlined"
                              color="primary"
                              error={false}
                              {...params}
                            />
                          )}
                        />
                      )}
                    />
                  </Box>
                  <Typography>to</Typography>
                  <Box>
                    <Controller
                      name="timeEnd"
                      control={methods.control}
                      defaultValue={new Date("")}
                      render={({ field }) => (
                        <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          label="From Date"
                          {...field}
                          renderInput={(params) => (
                            <TextField
                              id="timeEnd"
                              variant="outlined"
                              error={false}
                              {...params}
                            />
                          )}
                        />
                      )}
                    />
                    {!!methods.formState.errors.timeEnd && (
                      <Typography color="error">
                        {methods.formState.errors.timeEnd.message}
                      </Typography>
                    )}
                  </Box>
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box className={classes.generalItemBt}>
              <Typography className={classes.label}>Note</Typography>
              <TextareaAutosize
                aria-label="empty textarea"
                minRows={4}
                className={classes.textArea}
                {...register("note")}
              />
            </Box>

            <Box className={classes.generalItemBt}>
              <Typography className={classes.label}>All user</Typography>

              <Box
                className={classNames(classes.flex, classes.flexAlignCenter)}
              >
                <input type="Checkbox" className={classes.checkbox} />
                <Typography>
                  Auto add user as a member of this project when creating new
                  user
                </Typography>
              </Box>
            </Box>

            <Box className={classes.generalItemBt}>
              <Typography className={classes.label}>Project Type*</Typography>

              <Box>
                <Controller
                  name="projectType"
                  control={methods.control}
                  defaultValue={0}
                  render={({ field }) => {
                    return (
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        row
                        value={field.value}
                        onChange={(e, newValue) => {
                          field.onChange(newValue);
                        }}
                      >
                        <FormControlLabel
                          value={0}
                          control={<Radio className="radio-btn" />}
                          label="Time & Material"
                        />
                        <FormControlLabel
                          value={1}
                          control={<Radio className="radio-btn" />}
                          label="Fixed Fee"
                        />
                        <FormControlLabel
                          value={2}
                          control={<Radio className="radio-btn" />}
                          label="Non-Billable"
                        />
                        <FormControlLabel
                          value={3}
                          control={<Radio className="radio-btn" />}
                          label="ODC"
                        />
                      </RadioGroup>
                    );
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <NewClient open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

export default General;
