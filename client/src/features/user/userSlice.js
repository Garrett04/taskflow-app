import { createSlice } from "@reduxjs/toolkit"
import { fetchUserData } from "../../services/userService"


const initialState = {
    user: {},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})

export const selectUserData = (state) => state.user.user;
export const getUserDataStatus = (state) => state.user.status;
export const getUserDataError = (state) => state.user.error;

export default userSlice.reducer;