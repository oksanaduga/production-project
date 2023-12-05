import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initeArticlesPage } from '../initeArticlesPage/initeArticlesPage';
import { fetchArticlesList } from '../fetchArticleList/fetchArticlesList';

jest.mock('../fetchArticleList/fetchArticlesList');

describe('initeArticlesPage.test', () => {
    test('succes', async () => {
        const thunk = new TestAsyncThunk(initeArticlesPage, {
            articlesPage: {
                _inited: false,
                page: 1,
            },
        });

        await thunk.callThunk(undefined);

        expect(thunk.dispatch).toBeCalledTimes(4); // two dispatch at action + pending + fullfield
        expect(fetchArticlesList).toHaveBeenCalledWith({});
    });

    test('initeArticlesPage not called', async () => {
        const thunk = new TestAsyncThunk(initeArticlesPage, {
            articlesPage: {
                _inited: true,
                page: 1,
            },
        });

        await thunk.callThunk(undefined);

        expect(thunk.dispatch).toBeCalledTimes(2); // pending + fullfield
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
