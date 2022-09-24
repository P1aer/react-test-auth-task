import React, { useMemo, useState } from "react";
import "./index.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReadOnlyUserSerializer } from "../../react-app-env";
import { useAppSelector } from "../../redux/store";
import Loader from "../Loader/loader";
import UsersList from "../UsersList/UsersList";

export const SelectItems = {
  id: true,
  username: true,
  first_name: true,
  last_name: true,
  is_active: true,
  last_login: true,
  is_superuser: true,
};

interface UsersGridProps {
  searchQ: string;
}

const UsersGrid: React.FC<UsersGridProps> = ({ searchQ }) => {
  const users = useAppSelector((state) => state.auth.users);
  const [sortVal, setSort] = useState("");
  const [type, setType] = useState("ASC");
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const getSort = (a: ReadOnlyUserSerializer, b: ReadOnlyUserSerializer) => {
    if (type === "ASC") {
      if (a[sortVal] < b[sortVal]) {
        return -1;
      }
      if (a[sortVal] > b[sortVal]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortVal] < b[sortVal]) {
        return 1;
      }
      if (a[sortVal] > b[sortVal]) {
        return -1;
      }
      return 0;
    }
  };
  const sortedUsers = useMemo(() => {
    if (!sortVal) {
      return [...users.data];
    }
    return [...users.data].sort(getSort);
  }, [users.data, sortVal, type]);
  const sortAndSearch = useMemo(() => {
    return sortedUsers.filter((p) => p.username.includes(searchQ));
  }, [sortedUsers, searchQ]);
  return (
    <>
      <div>
        <FormControl
          variant="filled"
          sx={{ mt: "1rem", mr: "1rem", minWidth: 120 }}
        >
          <InputLabel id="demo-simple-select-standard-label">sort</InputLabel>
          <Select
            value={sortVal}
            onChange={handleSortChange}
            sx={{ fontSize: "1rem" }}
            autoWidth
            label="sort"
          >
            <MenuItem value="">None</MenuItem>
            {Object.keys(SelectItems).map((key: string) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ mt: "1rem", minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">type</InputLabel>
          <Select onChange={handleTypeChange} value={type} label="type">
            <MenuItem value="ASC">ASC</MenuItem>
            <MenuItem value="DESC">DESC</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {users.status === "loading" ? (
          <Loader />
        ) : (
          <UsersList list={sortAndSearch} />
        )}
      </div>
    </>
  );
};

export default UsersGrid;
