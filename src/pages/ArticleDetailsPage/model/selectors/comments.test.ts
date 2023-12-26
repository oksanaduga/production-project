import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getArticleDetailsCommentsError,
    getArticleDetailsCommentsIsLoading,
} from './comments';

describe('getArticleDetailsData', () => {
    test('should return is loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    isLoading: false,
                },
            },
        };

        expect(getArticleDetailsCommentsIsLoading(state as StateSchema)).toBe(
            false,
        );
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsCommentsIsLoading(state as StateSchema)).toBe(
            false,
        );
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    error: 'true',
                },
            },
        };

        expect(getArticleDetailsCommentsError(state as StateSchema)).toBe(
            'true',
        );
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getArticleDetailsCommentsError(state as StateSchema)).toEqual(
            undefined,
        );
    });
});
