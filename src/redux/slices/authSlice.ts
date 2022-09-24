import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthToken,
  ReadOnlyUserSerializer,
  TokenResponse,
} from "../../react-app-env";
import instance from "../../axios";

export interface AuthState {
  token: {
    data: string;
    status: "loading" | "fetched" | "error";
  };
  users: {
    data: ReadOnlyUserSerializer[];
    status: "loading" | "fetched" | "error";
  };
}

const initialState: AuthState = {
  token: {
    data: "",
    status: "fetched",
  },
  users: {
    data: [],
    status: "fetched",
  },
};

export const fetchToken = createAsyncThunk(
  "auth/fetchToken",
  async ({ params, remember }: { params: AuthToken; remember: boolean }) => {
    const { data } = await instance.post("api-token-auth/", params);
    if (remember) {
      localStorage.setItem("token", data.token);
    }
    instance.defaults.headers.common["Authorization"] = "Token " + data.token;
    return data;
  }
);
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const { data } = await instance.get("api/v1/users/");
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = initialState.token;
      state.users = initialState.users;
      localStorage.removeItem("token");
      delete instance.defaults.headers.common["Authorization"];
      console.log(instance.defaults.headers);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token.data = action.payload;
      instance.defaults.headers.common["Authorization"] =
        "Token " + action.payload;
      state.token.status = "fetched";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchToken.fulfilled,
      (state, { payload }: { payload: TokenResponse }) => {
        state.token.data = payload.token;
        sessionStorage.setItem("token", payload.token);
        state.token.status = "fetched";
      }
    );
    builder.addCase(fetchToken.pending, (state) => {
      state.token.status = "loading";
    });
    builder.addCase(fetchToken.rejected, (state) => {
      state.token.data = "";
      state.token.status = "error";
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, { payload }: { payload: ReadOnlyUserSerializer[] }) => {
        state.users.data = payload;
        state.users.status = "fetched";
      }
    );
    builder.addCase(fetchUsers.pending, (state) => {
      state.users.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.users.data = [];
      state.users.status = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout, setToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
