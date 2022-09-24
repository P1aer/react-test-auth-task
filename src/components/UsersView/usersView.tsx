import React, { useEffect } from "react";
import "./index.scss";
import Header from "../Header/header";
import UsersBlock from "../UsersBlock/UsersBlock";
import { useAppDispatch } from "../../redux/store";
import { fetchUsers } from "../../redux/slices/authSlice";

const UsersView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <>
      <Header />
      <UsersBlock />
    </>
  );
};

export default UsersView;
