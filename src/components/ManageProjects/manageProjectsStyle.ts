import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  managerProjects: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "40px",
    gap: "0px 50px",
  },
  button: {
    width: "180px",
    height: "50px",
    fontSize: ".8rem",
    backgroundColor: "#f24b50 !important",
  },
  flex: {
    display: "flex",
  },

  flex1: {
    flex: "1",
  },
}));
