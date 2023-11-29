import { ArticleDetailsSchema } from '../types/ArticleDetailsSchema';
import { articleDetailsReducer } from './articleDetailsSlice';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article, ArticleType, ArticleBlockType } from '../types/article';

describe('articleDetailsSlice.test', () => {
    test('test articleDetails pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: 'error',
        };

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.pending))
            .toEqual({
                isLoading: true,
                error: undefined,
            });
    });
    test('test articleDetails fulfilled', () => {
        const data: Article = {
            id: '1',
            title: 'Javascript news',
            subtitle: 'Что нового в JS за 2022 год?',
            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT],
            user: {
                id: '1',
                username: 'admin',
            },
            blocks: [
                {
                    id: '1',
                    type: ArticleBlockType.TEXT,
                    title: 'Заголовок этого блока',
                    paragraphs: [
                        'Программа, которую по традиции называют «Hello, world!», очень проста.',
                        'Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                    ],
                },
            ],
        };

        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        };

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(data, '', '')))
            .toEqual({
                isLoading: false,
                data,
            });
    });
});
