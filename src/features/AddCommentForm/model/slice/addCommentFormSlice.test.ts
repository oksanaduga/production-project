import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';

describe('addCommentFormSlice.test', () => {
    test('test setText', () => {
        const state: DeepPartial<AddCommentFormSchema> = {
            text: undefined,
        };

        expect(addCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText('text')))
            .toEqual({ text: 'text' });
    });
});
