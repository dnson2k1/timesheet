import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TextField } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import { useAppDispatch } from "~/hooks/hooks";
import {
  changeSearchValueMember,
  changeSearchValueTeam,
} from "~/redux/Project/projectSlice";
type Props = {
  type: string;
};

const Search = ({ type }: Props) => {
  const dispatch = useAppDispatch();

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValueMember(e.target.value));
  };
  const searchChangeTeam = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValueTeam(e.target.value));
  };
  const handleDebounceMember = useMemo(() => {
    if (type === "member") {
      return debounce(searchChange, 350);
    } else {
      return debounce(searchChangeTeam, 350);
    }
  }, []);

  useEffect(() => {
    return () => {
      handleDebounceMember.cancel();
    };
  });
  return (
    <form>
      <TextField
        id="outlined-basic"
        label="Search by name or email"
        variant="standard"
        fullWidth
        onChange={handleDebounceMember}
        InputProps={{
          endAdornment: <MagnifyingGlassIcon width={25} />,
        }}
      />
    </form>
  );
};

export default Search;
