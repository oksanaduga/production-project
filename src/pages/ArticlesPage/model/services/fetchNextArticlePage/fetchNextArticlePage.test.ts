import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchNextArticlePage } from './fetchNextArticlePage';
import { fetchArticlesList } from '../fetchArticleList/fetchArticlesList';

jest.mock('../fetchArticleList/fetchArticlesList');

describe('fetchNextArticlePage.test', () => {
    test('succes', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                hasMore: true,
                page: 2,
                isLoading: false,
                limit: 5,
                ids: [],
                entities: {},
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4); // two dispatch at action + pending + fullfield
        expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
    });

    test('fetchArticle not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                hasMore: false,
                page: 2,
                isLoading: false,
                limit: 5,
                ids: [],
                entities: {},
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2); // pending + fullfield
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
