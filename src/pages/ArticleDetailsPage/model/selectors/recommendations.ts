import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsPageRecomendationsIsLoading = (
    state: StateSchema,
) => state.articleDetailsPage?.recommendations?.isLoading || false;

export const getArticleDetailsPageRecomendationsError = (
    state: StateSchema,
) => state.articleDetailsPage?.recommendations?.error;
