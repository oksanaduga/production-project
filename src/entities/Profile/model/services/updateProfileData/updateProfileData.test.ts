import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { updateProfileData } from './updateProfileData';
import { ValidateProfileError } from '../../types/profile';

describe('updateProfileData.test', () => {
    test('succes', async () => {
        const data = {
            first: 'first name',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('server error', async () => {
        const data = {
            first: 'first name',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const data = {
            first: '',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });

        const result = await thunk.callThunk();

        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
});
