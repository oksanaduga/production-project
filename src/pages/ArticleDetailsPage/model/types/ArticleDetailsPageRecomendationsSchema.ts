import { EntityId, EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

export interface ArticleDetailsPageRecomendationsSchema extends EntityState<Article, EntityId> {
    isLoading?: boolean;
    error?: string;
}
