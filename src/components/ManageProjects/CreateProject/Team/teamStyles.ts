import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  team: {
    display: "flex",
    gap: "0 20px",
  },
  teamLeft: {
    flex: "1",
  },
  teamRight: {
    width: "400px",
  },
  heading: {
    "&": {
      fontWeight: "600 !important",
    },
  },
  according: {
    marginBottom: "20px !important",
  },
  team__Left: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  check: {
    display: "flex",
    alignItems: "center",
    gap: "0 10px",
  },
  checkbox: {
    width: 18,
    height: 18,
  },
}));
