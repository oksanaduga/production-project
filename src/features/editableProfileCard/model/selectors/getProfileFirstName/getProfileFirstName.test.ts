import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileFirstName } from './getProfileFirstName';

describe('getProfileFirstName', () => {
    test('should return profile first name', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: { first: 'first' },
            },
        };

        expect(getProfileFirstName(state as StateSchema)).toEqual('first');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileFirstName(state as StateSchema)).toEqual('');
    });
});
