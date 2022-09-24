import React, { useState } from "react";
import "./index.scss";
import SearchBlock from "../SearchBlock/SearchBlock";
import { Container, SelectChangeEvent } from "@mui/material";
import UsersGrid from "../UserGrid/UsersGrid";

const UsersBlock = () => {
  const [searchQ, setQ] = useState("");
  const onChange = (ev: SelectChangeEvent) => {
    setQ(ev?.target.value as string);
  };
  return (
    <Container sx={{ marginTop: "2rem" }} maxWidth={false}>
      <SearchBlock set={onChange} q={searchQ} />
      <UsersGrid searchQ={searchQ} />
    </Container>
  );
};

export default UsersBlock;
