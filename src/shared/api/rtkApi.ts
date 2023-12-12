import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCAL_STORAGE_KEY } from 'app/consts/consts';

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '';

            if (token) {
                headers.set('authorization', token);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
