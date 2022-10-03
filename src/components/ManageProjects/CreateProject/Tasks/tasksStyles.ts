import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  task: {},
  member: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    padding: "0 10px",
    "& .name": {
      marginLeft: "10px",
    },
    "& .row": {
      display: "flex",
      alignItems: "center",
      width: "50%",
    },
    "&:first-child": {
      borderTop: `1px solid ${theme.palette.grey[100]}`,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[50],
    },
    "&:hover ": {
      backgroundColor: theme.palette.grey[300],
    },
  },
  thead: {
    display: "flex",
    padding: "0 15px",
    "& tr": {
      display: "flex",
      alignItems: "center",
      width: "100%",
      "& td": {
        padding: 0,
      },
    },
    "& .text": {
      display: "flex",
      justifyContent: "space-between",
      width: "50%",
      fontWeight: "600",
    },
  },
  title: {
    margin: 0,
    fontWeight: 600,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    "& .MuiSelect-root": {
      fontSize: 14,
    },
  },
  ".MuiCheckbox-colorSecondary-451.Mui-checked": {
    color: "red",
  },
  checkbox: {
    accentColor: "red !important",

    width: 20,
    height: 20,
    marginLeft: 10,
  },
}));
