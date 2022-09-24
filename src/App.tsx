import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthView from "./components/Auth/auth";
import UsersVie from "./components/UsersView/usersView";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setToken } from "./redux/slices/authSlice";

function App() {
  const token = useAppSelector((state) => state.auth.token.data);
  const dispatch = useAppDispatch();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("token");
    if (data && load) {
      dispatch(setToken(data));
    }
    setLoad(false);
  }, []);
  return (
    <>
      {load ? (
        <></>
      ) : token ? (
        <Routes>
          <Route path={"/"} element={<AuthView />} />
          <Route path={"users"} element={<UsersVie />} />
          <Route path={"*"} element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={"/"} element={<AuthView />} />
          <Route path={"*"} element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
