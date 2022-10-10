import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { BRANCH_USER, TYPE_USER } from "~/enum";
import { useAppDispatch } from "~/hooks/hooks";
import { BRANCH } from "~/Mockup/branch";
import { TYPE } from "~/Mockup/type";
import {
  changeFilterBranchMember,
  changeFilterTypeMember,
} from "~/redux/Project/projectSlice";
import Search from "../Search/Search";
import { useStyles } from "./filtersStyles";

const Filters = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleChangeType = (type: TYPE_USER) => {
    dispatch(changeFilterTypeMember(type));
  };
  const handleChangeBranchMember = (type: BRANCH_USER) => {
    dispatch(changeFilterBranchMember(type));
  };
  return (
    <Box className={classes.filter}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="branch-select">Branch</InputLabel>
        <Select
          labelId="branch-select"
          id="branch-select-standard"
          label="Branch"
          defaultValue={BRANCH_USER.All}
        >
          {BRANCH.map((bra) => (
            <MenuItem
              key={bra.id}
              value={bra.value}
              onClick={() => handleChangeBranchMember(bra.value)}
            >
              {bra.branch}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="type-select">Type</InputLabel>
        <Select
          labelId="type-select"
          id="type-select-standard"
          label="Type"
          defaultValue={TYPE_USER.All}
        >
          {TYPE.map((type) => (
            <MenuItem
              key={type.id}
              value={type.value}
              onClick={() => handleChangeType(type.value)}
            >
              {type.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Search type="member" />
      </Box>
    </Box>
  );
};

export default Filters;
