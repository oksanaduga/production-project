import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsPageRecomendationsSchema } from './ArticleDetailsPageRecomendationsSchema';

export interface ArticleDetailsePageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsPageRecomendationsSchema
}
