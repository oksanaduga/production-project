import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

describe('articleDetailsCommentsSlice.test', () => {
    test('test articleDetailsComments pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false,
            error: 'error',
        };

        expect(articleDetailsCommentsReducer(state as ArticleDetailsCommentsSchema, fetchCommentsByArticleId.pending))
            .toEqual({
                isLoading: true,
                error: undefined,
            });
    });
    test('test articleDetailsComments fulfilled', () => {
        const data = [{
            id: '1',
            user: {
                id: '1',
                username: 'ivan',
            },
            text: 'text',
        }];

        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: true,
        };

        expect(articleDetailsCommentsReducer(state as ArticleDetailsCommentsSchema, fetchCommentsByArticleId.fulfilled(data, '', '')))
            .toEqual({
                isLoading: false,
                error: undefined,
                ids: ['1'],
                entities: {
                    1: {
                        id: '1',
                        user: {
                            id: '1',
                            username: 'ivan',
                        },
                        text: 'text',
                    },
                },
            });
    });
});
