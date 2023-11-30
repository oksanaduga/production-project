import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { useSelector } from 'react-redux';
import { getArticlesPageLimit } from '../../selectors/articlePageSelectors';

export interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const { page = 1 } = props;
        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
