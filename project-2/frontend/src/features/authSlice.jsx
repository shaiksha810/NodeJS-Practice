import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        accessToken: null,
        isAuthenticated: false
    },

    reducers: {

        addUser: (state, action) => {
            state.user = action.payload.data.user
            state.accessToken = action.payload.accessToken
            state.isAuthenticated = true
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },

        removeUser: (state) => {
            state.user = null
            state.accessToken = null
            state.isAuthenticated = false
        }

    }
})

export const { addUser, removeUser, setAccessToken } = authSlice.actions

export default authSlice.reducer