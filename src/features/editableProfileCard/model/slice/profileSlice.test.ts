import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema, ValidateProfileError } from '../types/EditableProfileCardSchema';

describe('profileSlice.test', () => {
    test('test set setReadonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: true,
        };

        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(false)))
            .toEqual({ readonly: false });
    });
    test('test set cancelEdit', () => {
        const data = {
            first: 'first name',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const state: DeepPartial<ProfileSchema> = {
            data,
        };

        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
            .toEqual({
                validateErrors: undefined,
                readonly: true,
                form: state.data,
                data,
            });
    });
    test('test set updateProfile', () => {
        const data = {
            first: 'first name',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const state: DeepPartial<ProfileSchema> = {
            form: data,
        };

        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ first: 'change name' })))
            .toEqual({
                form: {
                    ...data,
                    first: 'change name',
                },
            });
    });
    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        // @ts-ignore
        expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
            .toEqual({
                isLoading: true,
                validateErrors: undefined,
            });
    });
    test('test update profile service fulfilled', () => {
        const data = {
            first: 'first name',
            lastname: 'last name',
            age: 29,
            currency: Currency.EUR,
            country: Country.Armenia,
            city: 'city',
            username: 'admin',
        };

        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '')))
            .toEqual({
                validateErrors: undefined,
                isLoading: false,
                data,
                form: data,
            });
    });
});
