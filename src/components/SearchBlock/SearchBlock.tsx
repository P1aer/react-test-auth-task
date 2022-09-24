import React, { ChangeEventHandler } from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBlockProps {
  set: ChangeEventHandler<HTMLInputElement>;
  q: string;
}

const SearchBlock: React.FC<SearchBlockProps> = ({ set, q }) => {
  return (
    <div>
      <TextField
        fullWidth
        name="search"
        value={q}
        onChange={set}
        placeholder="search"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
    </div>
  );
};

export default SearchBlock;
