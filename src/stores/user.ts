// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import storage from "@/utils/storage";
import { getPermmenu, getPerson, loginAPI } from "@/server";
import { IUserState } from "@/types/user";

const initialState: IUserState = {
  token: storage.get("token") || "",
  refreshToken: storage.get("refreshToken") || "",
  info: null,
  perms: [],
  menus: [],
};

// 异步登录操作
export const login = createAsyncThunk(
  "user/login",
  async (params: any, { dispatch }) => {
    const result = await loginAPI(params);
    dispatch(
      setToken({ token: result.token, refreshToken: result.refreshToken })
    );
    return result;
  }
);

// 异步获取用户信息
export const fetchUserInfo = createAsyncThunk("user/get", async () => {
  const [person, permmenu] = await Promise.all([getPerson(), getPermmenu()]);
  return { person, permmenu };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      const { token, refreshToken } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken;
      storage.set("token", token);
      storage.set("refreshToken", refreshToken);
    },
    logout: (state) => {
      state.token = "";
      state.refreshToken = "";
      state.info = null;
      state.perms = [];
      state.menus = [];
      storage.remove("token");
      storage.remove("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.info = payload.person;
      state.perms = payload.permmenu.perms;
      state.menus = payload.permmenu.menus;
    });
  },
});

export const { setToken, logout } = userSlice.actions;
export default userSlice.reducer;
