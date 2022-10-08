import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  flex: {
    display: "flex",
  },
  member: {
    alignItems: "center",
    marginTop: 20,
    gap: "0 20px",
    padding: "10px 20px",
    transition: ".3s all",
    "&:nth-child(even)": {
      backgroundColor: "#f9f9f9",
    },
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  name: {
    "&": {
      fontWeight: "500 !important",
    },
  },
  span: {
    margin: "0 10px",
    backgroundColor: "#f44336",
    padding: "5px",
    fontSize: 12,
    borderRadius: "100px",
    color: "#fff",
  },
  collaborator: {
    backgroundColor: "#2e95ea",
  },
  internship: {
    backgroundColor: "#4caf50",
  },

  bgLevel: {
    backgroundColor: "#c8a8a0",
  },
  icon__right: {
    "&": {
      position: "absolute",
      right: "20px",
    },
  },
  typeNull: {
    backgroundColor: "transparent",
  },
});
