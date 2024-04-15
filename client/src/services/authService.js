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