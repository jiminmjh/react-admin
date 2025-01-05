// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import storage from '@/utils/storage'
import { getPermmenu, getPerson, loginAPI } from '@/server'
import { ILoginRes, IMenuItem, IUserInfo, IUserState } from '@/types/user'
import { ILoginParams } from '@/types/login'

type ISetToken = ILoginRes & { isChangeRefresh: boolean }
type IUserInfo = [person: IUserInfo, permmenu: { perms: string[]; menus: IMenuItem[] }]

const initialState: IUserState = {
  token: storage.get('token') || '',
  refreshToken: storage.get('refreshToken') || '',
  info: null,
  perms: [],
  menus: []
}

// 异步登录操作
export const login = createAsyncThunk('user/login', async (params: ILoginParams, { dispatch }) => {
  const result: ILoginRes = await loginAPI(params)
  dispatch(setToken({ ...result, isChangeRefresh: true }))
  return result
})

// 异步获取用户信息
export const fetchUserInfo = createAsyncThunk('user/get', async () => {
  const [person, permmenu]: IUserInfo = await Promise.all([getPerson(), getPermmenu()])
  return { person, permmenu }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<ISetToken>) => {
      const { token, refreshToken, expire, refreshExpire } = action.payload
      // 写入token
      state.token = token
      const isRefresh = action.payload.isChangeRefresh ?? true
      isRefresh && (state.refreshToken = refreshToken)

      // 写入本地存储
      // storage.set('token', token, 5) // 自定义token到期时间 s
      // storage.set('refreshToken', refreshToken, 50)
      storage.set('token', token, expire)
      storage.set('refreshToken', refreshToken, refreshExpire)
    },
    logout: state => {
      state.token = ''
      state.refreshToken = ''
      state.info = null
      state.perms = []
      state.menus = []
      storage.remove('token')
      storage.remove('refreshToken')
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.fulfilled, (state: IUserState, { payload }) => {
      state.info = payload.person
      state.perms = payload.permmenu.perms
      state.menus = payload.permmenu.menus
    })
  }
})

export const { setToken, logout } = userSlice.actions
export default userSlice.reducer
