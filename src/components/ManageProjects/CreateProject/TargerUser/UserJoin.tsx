import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAppDispatch } from "~/hooks/hooks";
import { ITargetUser } from "~/interfaces/projectTypes";
import {
  changeRoleTargetUser,
  removeTargetUserFromProject,
} from "~/redux/Project/projectSlice";
import { useStyles } from "./targetuserStyles";

type Props = {
  user: ITargetUser;
};

const UserJoin = ({ user }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [role, setRole] = useState("");
  const [id, setId] = useState<number>(-1);
  useEffect(() => {
    const timeOutId = setTimeout(
      () => dispatch(changeRoleTargetUser({ id: id, name: role })),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [role, id]);

  return (
    <td className={classes.target_user}>
      <div className="row">
        <IconButton>
          <XMarkIcon
            width={25}
            onClick={() => dispatch(removeTargetUserFromProject(user.userId))}
          />
        </IconButton>
        <p className="name">{user.name}</p>
      </div>
      <TextField
        id="standard-basic"
        label="Role name"
        variant="standard"
        defaultValue={user.roleName}
        fullWidth
        onChange={(e) => {
          setRole(e.target.value);
          setId(user.userId);
        }}
      />
    </td>
  );
};

export default UserJoin;
