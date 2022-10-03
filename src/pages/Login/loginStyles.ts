import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  login: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#00bcd4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "400px",
    height: "400px",
    backgroundColor: "#fff",
    padding: 30,
    boxShadow: "1px 1px 12px -5px #000",
    borderRadius: 2,
  },
  submit: {},
  heading: {
    fontSize: "35px !important",
    color: "#fff",
    textAlign: "center",
    marginBottom: "10px !important",
  },
  error: {
    fontSize: 13,
    color: "red",
  },
}));
