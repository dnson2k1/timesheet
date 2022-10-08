import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import classNames from "classnames";

import { LEVELUSER, TYPES, TYPE_USER } from "~/enum";
import { useAppDispatch } from "~/hooks/hooks";
import { IProjectUser } from "~/interfaces/projectTypes";
import { ITeamType, teamType } from "~/Mockup/teamType";
import {
  addMemberJoinProject,
  changeMemberType,
  removeJoinProject,
} from "~/redux/Project/projectSlice";

import { useStyles } from "./memberStyles";

type Props = {
  user: IProjectUser;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  isSelect?: boolean;
};

const Member = ({ user, iconLeft, iconRight, isSelect }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleAddJoinProject = () => {
    dispatch(addMemberJoinProject(user.id));
  };

  const handleRemoveMemberJoinProject = () => {
    dispatch(removeJoinProject(user.id));
  };

  return (
    <Box className={classNames(classes.member, classes.flex)}>
      <Box>
        {iconLeft ? (
          <Box onClick={handleRemoveMemberJoinProject}> {iconLeft}</Box>
        ) : (
          <ChevronLeftIcon
            width={25}
            onClick={handleAddJoinProject}
            cursor="pointer"
          />
        )}
      </Box>
      <Box>
        <Avatar
          src={`http://training-api-timesheet.nccsoft.vn${user.avatarPath}`}
        ></Avatar>
        <Typography variant="body2">Member</Typography>
      </Box>
      <Box>
        <Box className={classes.name}>
          {user.name}
          <Box
            className={classNames(
              classes.span,
              `${
                user.type === TYPE_USER.Collaborator
                  ? classes.collaborator
                  : user.type === TYPE_USER.InternShip
                  ? classes.internship
                  : ""
              }
              ${TYPES[user.type] === undefined ? classes.typeNull : ""}
              `
            )}
            component="span"
          >
            {TYPES[user.type]}
          </Box>
          <Box
            component="span"
            className={`${classes.span} ${classes.bgLevel}  ${
              LEVELUSER[user.level] === undefined ? classes.typeNull : ""
            }`}
          >
            {LEVELUSER[user.level]}
          </Box>
        </Box>
        <Typography variant="body2">{user.emailAddress}</Typography>
      </Box>
      {isSelect && (
        <Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
            <Select
              labelId="team-type-select"
              id="team-type"
              defaultValue={user.users.type}
            >
              {teamType.map((item: ITeamType) => (
                <MenuItem
                  key={item.id}
                  value={item.value}
                  onClick={() => {
                    dispatch(
                      changeMemberType({ id: user.id, type: item.value })
                    );
                  }}
                >
                  {item.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box
        className={classes.icon__right}
        onClick={handleRemoveMemberJoinProject}
      >
        {iconRight && iconRight}
      </Box>
    </Box>
  );
};

export default Member;
