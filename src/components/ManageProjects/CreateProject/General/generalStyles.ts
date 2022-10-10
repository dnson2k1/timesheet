import { Theme, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  general: {},
  generalItems: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  generalItem: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    margin: "20px 0",
  },
  generalItemBt: {
    display: "grid",
    gridTemplateColumns: "1fr 5fr",
    margin: "20px 0",
  },
  label: {
    "&": {
      fontWeight: "600 !important",
    },
  },
  textArea: {
    padding: "10px",
    fontSize: "16px",
    fontFamily: "Roboto",
  },
  flex: {
    display: "flex",
  },
  flexAlignCenter: {
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  date: {
    display: "flex",
    alignItems: "center",
    gap: "0 20px",
    position: "relative",
  },
  log_error: {
    position: "absolute",
  },
  button: {
    height: "30px",
    backgroundColor: "#f24b50 !important",
    color: "#fff !important",
    padding: "20px !important",
    marginTop: "20px !important",
  },
  error: {
    color: "red !important",
  },
  select: {
    zIndex: 10001,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
