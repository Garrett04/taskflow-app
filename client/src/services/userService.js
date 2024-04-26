import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./client";


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async () => {
        try {
            const response = await API.get('/users');

            return response.data.user;
        } catch (err) {
            throw err.response;
        }
    }
)

export const updateUser = async (data) => {
    try {
        const response = await API.put('/users', data);

        return response.data.user;
    } catch (err) {
        throw err.response;
    }
}