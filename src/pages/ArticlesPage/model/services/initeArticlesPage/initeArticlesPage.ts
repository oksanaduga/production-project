import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { getArticlesPageInited } from '../../selectors/articlePageSelectors';
import { fetchArticlesList } from '../fetchArticleList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlesPageSlice';

export const initeArticlesPage = createAsyncThunk<
    void,
    URLSearchParams | undefined,
    ThunkConfig<string>
>('articlesPage/initeArticlesPage', (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    const isInited = getArticlesPageInited(getState());

    if (!isInited) {
        const orderFromUrl = searchParams?.get('order') as SortOrder;
        const sortFromUrl = searchParams?.get('sort') as ArticleSortField;
        const searchFromUrl = searchParams?.get('search');
        const searchFromType = searchParams?.get('type') as ArticleType;

        if (orderFromUrl) {
            dispatch(articlesPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(articlesPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(articlesPageActions.setSearch(searchFromUrl));
        }
        if (searchFromType) {
            dispatch(articlesPageActions.setType(searchFromType));
        }

        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
