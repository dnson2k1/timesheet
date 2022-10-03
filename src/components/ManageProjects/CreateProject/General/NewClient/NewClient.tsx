import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "~/hooks/hooks";
import { ICustomer } from "~/interfaces/customerType";
import { createCustomer } from "~/redux/Customer/customerThunk";

import { useStyles } from "./newClientStyles";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const NewClient = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomer>({
    mode: "onTouched",
  });
  const classes = useStyles();

  const onSubmitForm = (data: ICustomer) => {
    dispatch(
      createCustomer({
        name: data.name,
        code: data.code,
        address: data.address,
      })
    );
    reset({
      name: "",
      code: "",
      address: "",
    });
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Client</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Prenom *"
                variant="standard"
                {...register("name", { required: "Prenom is not required" })}
              />
              {errors.name && (
                <p className={classes.error}>{errors.name.message}</p>
              )}
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Code * "
                variant="standard"
                {...register("code", {
                  required: "Code is not required",
                })}
              />
              {errors.code?.type === "required" && (
                <p className={classes.error}>{errors.code.message}</p>
              )}
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Address"
                variant="standard"
                {...register("address")}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmitForm)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewClient;
