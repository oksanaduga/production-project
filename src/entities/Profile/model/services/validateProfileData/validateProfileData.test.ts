import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/profile';

describe('validateProfileData.test', () => {
    test('success', async () => {
        const data = {
            first: 'first name',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('without firstname lastname', async () => {
        const data = {
            first: '',
            lastname: '',
            age: 29,
            country: Country.Armenia,
        };

        const result = validateProfileData(data);

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async () => {
        const data = {
            first: 'first',
            lastname: 'last',
            age: undefined,
            country: Country.Armenia,
        };

        const result = validateProfileData(data);

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect country', async () => {
        const data = {
            first: 'first',
            lastname: 'last',
            age: 29,
            country: undefined,
        };

        const result = validateProfileData(data);

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('incorrect all', async () => {
        const data = {
            first: '',
            lastname: '',
            age: undefined,
            country: undefined,
        };

        const result = validateProfileData(data);

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
