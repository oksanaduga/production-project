import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { addCommentForArticle } from './addCommentForArticle';

describe('addCommentForArticle.test', () => {
    test('succes', async () => {
        const data = [{
            id: '1',
            user: {
                id: '1',
                username: 'ivan',
            },
            text: 'text',
        }];

        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: {},
            articleDetails: {
                data: { id: '1' },
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('text');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {
            user: {},
            articleDetails: {
                data: { id: '1' },
            },
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('text');

        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
