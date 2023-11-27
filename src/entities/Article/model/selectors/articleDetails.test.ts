import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getArticleDetailsData, getArticleDetailsIsLoading, getArticleDetailsError } from './articleDetails';
import { ArticleType, ArticleBlockType, Article } from '../types/article';

describe('getArticleDetailsData', () => {
    test('should return article details data', () => {
        const data: Article = {
            id: '1',
            title: 'Javascript news',
            subtitle: 'Что нового в JS за 2022 год?',
            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
            views: 1022,
            createdAt: '26.02.2022',
            type: [ArticleType.IT],
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

        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };

        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
    test('should return article details loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };

        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });
    test('should return article details error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'true',
            },
        };

        expect(getArticleDetailsError(state as StateSchema)).toEqual('true');
    });
    test('should work with empty error', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
