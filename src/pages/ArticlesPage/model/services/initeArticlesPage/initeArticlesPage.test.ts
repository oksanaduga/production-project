import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initeArticlesPage } from '../initeArticlesPage/initeArticlesPage';
import { fetchArticlesList } from '../fetchArticleList/fetchArticlesList';

jest.mock('../fetchArticleList/fetchArticlesList');

describe('initeArticlesPage.test', () => {
    test('succes', async () => {
        const thunk = new TestAsyncThunk(initeArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4); // two dispatch at action + pending + fullfield
        expect(fetchArticlesList).toHaveBeenCalledWith({ page: 1 });
    });

    test('initeArticlesPage not called', async () => {
        const thunk = new TestAsyncThunk(initeArticlesPage, {
            articlesPage: {
                _inited: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2); // pending + fullfield
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
