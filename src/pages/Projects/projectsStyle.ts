import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  projects: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #d9dbda",
    padding: "10px 15px",
  },
  refresh: {
    marginRight: 10,
  },
}));
