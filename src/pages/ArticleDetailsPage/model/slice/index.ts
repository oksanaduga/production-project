import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleDetailsPageRecomendationsReducer } from './articleDetailsPageRecomendationsSlice';
import { ArticleDetailsePageSchema } from '../types';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsePageSchema>({
    recommendations: articleDetailsPageRecomendationsReducer,
    comments: articleDetailsCommentsReducer,
});
