import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "~/hooks/hooks";
import { useStyles } from "./notifiStyles";

const Notification = () => {
  const classes = useStyles();
  const [notify, setNotify] = useState<boolean>(false);

  const { isEdit } = useAppSelector((state) => state.projectReducer);

  const handleChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setNotify(isEdit ? !notify : e.target.checked);
  };
  const { register } = useFormContext();

  const methods = useFormContext();

  useEffect(() => {
    isEdit && setNotify(true);
  }, [isEdit]);

  return (
    <Box>
      <Box className={classes.header}>
        <input
          className={classes.checkbox}
          type="Checkbox"
          onChange={handleChangeCheckBox}
          name="komu"
          checked={notify}
        />
        <Typography>Gửi thông báo đến Komu</Typography>
      </Box>

      {notify ? (
        <Box className={classes.Boxinput}>
          {isEdit ? (
            <TextField
              id="standard-basic"
              label="Komu channel Id"
              variant="standard"
              fullWidth
              className={classes.input}
              {...methods.register("komuChannelId")}
            />
          ) : (
            <TextField
              id="standard-basic"
              label="Komu channel Id"
              variant="standard"
              fullWidth
              className={classes.input}
              {...register("komuChannelId")}
            />
          )}
        </Box>
      ) : (
        <Box className={classes.channel}>
          <Typography className={classes.title}>Komu channel Id</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Notification;
