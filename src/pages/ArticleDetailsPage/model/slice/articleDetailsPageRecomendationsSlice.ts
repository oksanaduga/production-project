import {
    EntityId,
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ArticleDetailsPageRecomendationsSchema } from '../types/ArticleDetailsPageRecomendationsSchema';
import { fetchArticlesRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const initialState: ArticleDetailsPageRecomendationsSchema = {
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
};

export const recommendationsAdapter = createEntityAdapter<Article, EntityId>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

export const articleDetailsPageRecomendationsSlice = createSlice({
    name: 'articleDetailsPageRecomendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsPageRecomendationsSchema>(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const {
    reducer: articleDetailsPageRecomendationsReducer,
} = articleDetailsPageRecomendationsSlice;
