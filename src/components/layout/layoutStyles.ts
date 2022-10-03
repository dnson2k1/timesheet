import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  layBoxPaper: {
    backgroundColor: "rgb(233,233,233)",
    width: "100%",
    padding: "24px",
    marginTop: "64px",
    minHeight: "100vh",
  },

  layoutPaper: {
    height: "100%",
    marginLeft: "300px",
  },
  flex: {
    display: "flex",
  },
  flexItemsCenter: {
    alignItems: "center",
  },
  flexJustify: {
    justifyContent: "space-between",
  },
}));
