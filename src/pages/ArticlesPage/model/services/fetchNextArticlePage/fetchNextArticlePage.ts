import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getArticlesPageHasMore, getArticlesPageIsLoading, getArticlesPageNum,
} from '../../selectors/articlePageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticleList/fetchArticlesList';

export interface FetchArticlesListProps {
    page?: number;
}

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchNextArticlePage',
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const hasMore = getArticlesPageHasMore(getState());
        const page = getArticlesPageNum(getState());
        const isLoading = getArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            const newPage = page + 1;

            dispatch(articlesPageActions.setPage(newPage));
            dispatch(fetchArticlesList({}));
        }
    },
);
