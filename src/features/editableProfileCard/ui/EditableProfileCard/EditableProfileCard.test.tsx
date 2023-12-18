import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

describe('test features/EditableProfileCard', () => {
    test('test EditableProfileCard readonly mode change', async () => {
        const profile: Profile = {
            id: '1',
            first: 'Oksana',
            lastname: 'Dugawef',
            age: 18,
            currency: Currency.RUB,
            country: Country.Kazakhstan,
            city: 'Saint-Petersburg',
            username: 'admin',
        };

        componentRender(<EditableProfileCard id="1" />, {
            initialState: {
                profile: {
                    data: profile,
                    form: profile,
                    isLoading: false,
                    error: '',
                    readonly: true,
                    validateErrors: [],
                },
                user: {
                    authData: {
                        id: '1',
                    },
                },
            },
            asyncReducers: {
                profile: profileReducer,
            },
        });

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('test EditableProfileCard id cancel click data reset', async () => {
        const profile: Profile = {
            id: '1',
            first: 'Oksana',
            lastname: 'Dugawef',
            age: 18,
            currency: Currency.RUB,
            country: Country.Kazakhstan,
            city: 'Saint-Petersburg',
            username: 'admin',
        };

        componentRender(<EditableProfileCard id="1" />, {
            initialState: {
                profile: {
                    data: profile,
                    form: profile,
                    isLoading: false,
                    error: '',
                    readonly: true,
                    validateErrors: [],
                },
                user: {
                    authData: {
                        id: '1',
                    },
                },
            },
            asyncReducers: {
                profile: profileReducer,
            },
        });

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'anotherName');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('anotherName');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Oksana');
    });

    test('test EditableProfileCard id should be error', async () => {
        const profile: Profile = {
            id: '1',
            first: 'Oksana',
            lastname: 'Dugawef',
            age: 18,
            currency: Currency.RUB,
            country: Country.Kazakhstan,
            city: 'Saint-Petersburg',
            username: 'admin',
        };

        componentRender(<EditableProfileCard id="1" />, {
            initialState: {
                profile: {
                    data: profile,
                    form: profile,
                    isLoading: false,
                    error: '',
                    readonly: true,
                    validateErrors: [],
                },
                user: {
                    authData: {
                        id: '1',
                    },
                },
            },
            asyncReducers: {
                profile: profileReducer,
            },
        });

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('test EditableProfileCard id should be error', async () => {
        const mockPutMethod = jest.spyOn($api, 'put');

        const profile: Profile = {
            id: '1',
            first: 'Oksana',
            lastname: 'Dugawef',
            age: 18,
            currency: Currency.RUB,
            country: Country.Kazakhstan,
            city: 'Saint-Petersburg',
            username: 'admin',
        };

        componentRender(<EditableProfileCard id="1" />, {
            initialState: {
                profile: {
                    data: profile,
                    form: profile,
                    isLoading: false,
                    error: '',
                    readonly: true,
                    validateErrors: [],
                },
                user: {
                    authData: {
                        id: '1',
                    },
                },
            },
            asyncReducers: {
                profile: profileReducer,
            },
        });

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'anothername');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(mockPutMethod).toHaveBeenCalled();
    });
});
