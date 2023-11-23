import { USER_LOCAL_STORAGE_KEY } from 'app/consts/consts';
import axios from 'axios';

// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '',
    },
});