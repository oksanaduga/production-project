import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsPageRecomendationsReducer } from './articleDetailsPageRecomendationsSlice';
import { ArticleDetailsePageSchema } from '../types';
// Reducer<EntityState<Article, EntityId> & ArticleDetailsPageRecomendationsSchema>
export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsePageSchema>({
        // @ts-ignore
        recommendations: articleDetailsPageRecomendationsReducer,
        // @ts-ignore
        comments: articleDetailsCommentsReducer,
    });
