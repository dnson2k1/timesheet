import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  productItem: {
    width: "100%",
  },
  list: {
    width: "100%",
  },
  listSubHeader: {
    backgroundColor: "#d3d3d3 !important",
    width: "100%",
    color: "#555 !important",
    fontSize: "17px !important",
    fontWeight: "bold",
    borderRadius: 4,
  },
  listItem: {
    position: "relative",
    paddingY: "10px !important",
    display: "flex !important",
    justifyContent: "space-between !important",
    backgroundColor: "242, 245, 243 !important",
    borderBottom: "1px solid #ededed",
  },
  flex: {
    display: "flex",
  },
  listItemTypo: {
    "& + &": {
      marginLeft: 10,
      borderRadius: 100,
      fontSize: 13,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "2px 10px",
      fontWeight: "600 !important",
    },
    "&:nth-of-type(2)": {
      backgroundColor: "#2e95ea",
    },
    "&:nth-of-type(3)": {
      backgroundColor: "#f44336",
    },
    "&:nth-of-type(4)": {
      backgroundColor: "#f89c26",
    },
    "&:nth-of-type(5)": {
      backgroundColor: "#4caf50",
    },
  },
  paperActions: {
    minWidth: "110px !important",
  },
  status: {
    position: "absolute",
    color: "#fff",
    right: "15%",
    fontSize: "14px",

    padding: "2px 10px",
    borderRadius: 3,
  },
  status__inactive: {
    backgroundColor: " #9e9e9e",
  },
  status__active: {
    backgroundColor: "#4caf50",
  },
}));
