import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0 30px",
    padding: "0 30px",
  },
  header_flex: {
    display: "flex",
    gap: "0 20px",
    alignItems: "center",
  },
  right: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ml: {
    marginLeft: "10px !important",
  },
  text: {
    fontSize: " 18px !important",
  },
  export: {
    backgroundColor: "red !important",
    color: "#fff !important",
  },
  input: {
    marginBottom: 20,
  },
});
