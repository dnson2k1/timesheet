import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Header from "./components/Header/Header";
import Device from "./components/Device/Device";
import { Box } from "@mui/material";
import { useAppDispatch } from "~/hooks/hooks";
import { resetProjectForm } from "~/redux/Project/projectSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    minWidth: `70%`,
    minHeight: "70% !important",
  },
  "&": {
    marginTop: "45px",
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function View({ open, setOpen }: Props) {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch(resetProjectForm());
  };
  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Header />
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Device />
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
