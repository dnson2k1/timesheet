import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    gap: "20px 0",
  },
  error: {
    color: "red",
    fontSize: "13px !important",
  },
}));
