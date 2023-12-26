import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getAddCommentFormText,
    getAddCommentFormError,
} from './addCommentFormSelectors';

describe('addCommentFormSelectors.test', () => {
    test('should return addCommentForm text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'text',
            },
        };

        expect(getAddCommentFormText(state as StateSchema)).toEqual('text');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAddCommentFormText(state as StateSchema)).toEqual('');
    });
    test('should return addCommentForm error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                error: 'error',
            },
        };

        expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
    });
});
