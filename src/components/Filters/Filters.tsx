import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TextField } from "@material-ui/core";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FILTER_SELECTED } from "~/enum";

import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import {
  changeRequestSearch,
  changeRequestType,
} from "~/redux/ManageProject/manageProjectSlice";
import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

export type IDataSearch = {
  search: string;
};

const Filters = () => {
  const dispatch = useAppDispatch();
  const { projectQuantities } = useAppSelector(
    (state) => state.manageProjectReducer
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeRequestSearch(e.target.value));
  };
  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 700);
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <Box sx={{ display: "flex", gap: "20px" }}>
      <Box sx={{ minWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="select-projects">Projects</InputLabel>
          <Select
            labelId="select-projects"
            id="select-proj"
            label="Projects"
            displayEmpty
            defaultValue={FILTER_SELECTED.ALL_PROJECT}
          >
            <MenuItem
              value={FILTER_SELECTED.ALL_PROJECT}
              onClick={() =>
                dispatch(changeRequestType(FILTER_SELECTED.ALL_PROJECT))
              }
            >
              All projects (
              {projectQuantities[1]?.quantity + projectQuantities[0]?.quantity})
            </MenuItem>
            <MenuItem
              value={FILTER_SELECTED.DEACTIVE_PROJECT}
              onClick={() =>
                dispatch(changeRequestType(FILTER_SELECTED.DEACTIVE_PROJECT))
              }
            >
              Deactive projects ({projectQuantities[1].quantity})
            </MenuItem>
            <MenuItem
              value={FILTER_SELECTED.ACTIVE_PROJECT}
              onClick={() =>
                dispatch(changeRequestType(FILTER_SELECTED.ACTIVE_PROJECT))
              }
            >
              Active projects ({projectQuantities[0].quantity})
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="outlined-basic"
        label="Search by client or project name"
        variant="outlined"
        onChange={debouncedResults}
        style={{ width: "100%" }}
        InputProps={{
          endAdornment: <MagnifyingGlassIcon width={25} />,
        }}
      />
    </Box>
  );
};

export default Filters;
