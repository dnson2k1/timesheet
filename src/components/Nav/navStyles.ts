import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  wrapper__nav: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    background: "#fff",
    zIndex: 999,
    width: "300px",
    marginTop: "64px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    background: "rgba(244,67,54,.4)  ",
    position: "relative",
    height: "100px",
  },
  avt: {
    width: 50,
    height: 50,
  },
  logout: {
    "&": {
      position: "absolute !important",
      right: 10,
      bottom: 5,
      color: "#fff !important",
      fontSize: "15px !important",
    },
  },
  paper: {
    height: "100vh",
  },
  active: {
    "& > li": {
      backgroundColor: "rgba(244,67,54,.7) !important",
      color: "#fff !important",
    },
  },
});
