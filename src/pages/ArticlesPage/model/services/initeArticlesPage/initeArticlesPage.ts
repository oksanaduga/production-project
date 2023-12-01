import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesPageInited } from '../../selectors/articlePageSelectors';
import { fetchArticlesList } from '../fetchArticleList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const initeArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/initeArticlesPage',
    (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const isInited = getArticlesPageInited(getState());

        if (!isInited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
