import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    setUser(state, action) {
        const d = action.payload;
      return {...state, ...d, isLogined: true};
    },
    logout(state, action) {
      return {isLogined: false};
    },
  }
})

export const { setUser, logout } = loginSlice.actions
export default loginSlice.reducer