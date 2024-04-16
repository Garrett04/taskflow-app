import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './client';

export const fetchAuthenticationStatus = createAsyncThunk(
    'auth/fetchAuthenticationStatus',
    async () => {
        try {
            const response = await API.get('/auth/check-authentication');
            return response.data.authenticated;
        } catch (err) {
            throw err.response;
        }
    }
);

export const loginUser = async (data) => {
    try {
        const { username, password } = data;

        const response = await API.post(
            '/auth/login', 
            { 
                username, 
                password 
            }
        );

        return response.data;
    } catch (err) {
        throw err.response;
    }
}

export const logoutUser = async () => {
    try {
        const response = await API.post('/auth/logout');

        return response.data;
    } catch (err) {
        throw err.response;
    }
}