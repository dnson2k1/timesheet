import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  appBar: {
    backgroundColor: "rgb(244,67,54)",
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
  title: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 600,
  },
}));
