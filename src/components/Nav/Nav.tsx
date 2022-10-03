import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { NAV } from "~/Mockup/nav";
import { getUser, logoutSuccess } from "~/pages/Login/loginSlice";
import { useStyles } from "./navStyles";

const Nav = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.loginReducer);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Paper elevation={2} className={(classes.paper, classes.wrapper__nav)}>
      <Box>
        <Box className={classes.nav}>
          <Box padding={"20px"}>
            <Avatar
              variant={"rounded"}
              alt="The image"
              src={`http://training-api-timesheet.nccsoft.vn${user.avatarPath}`}
              className={classes.avt}
            />
          </Box>
          <Box color={"#fff"}>
            <Typography variant="body1">
              {user.userName ? user.userName : "name"}
            </Typography>
            <Typography variant="body2">
              {user.emailAddress ? user.emailAddress : "user-address"}
            </Typography>
          </Box>

          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={classes.logout}
            >
              <ChevronDownIcon width={15} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Box>
        <MenuList>
          {NAV.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
            >
              <MenuItem sx={{ marginBottom: 1, paddingY: 1 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography variant="body1" fontWeight={600}>
                  {item.display}
                </Typography>
              </MenuItem>
            </NavLink>
          ))}
        </MenuList>
      </Box>
    </Paper>
  );
};

export default Nav;
