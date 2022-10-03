import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "~/hooks/hooks";
import { ITargetUser } from "~/interfaces/projectTypes";
import { addTargetUserToProject } from "~/redux/Project/projectSlice";
import { useStyles } from "./targetuserStyles";

type Props = {
  user: ITargetUser;
};

const User = ({ user }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <div className={classes.target_user}>
      <div className="row">
        <Button>
          <PlusCircleIcon
            width={25}
            onClick={() => dispatch(addTargetUserToProject(user.userId))}
          />
        </Button>
        <p className="name">{user.name}</p>
      </div>
    </div>
  );
};

export default User;
