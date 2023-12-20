import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Raiting';

interface GetProfileRatingParams {
    userId: string;
    profileId: string;
}

interface ProfileRateParams extends GetProfileRatingParams {
    rate: number;
}

const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], GetProfileRatingParams>({
            query: ({ userId, profileId }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        rateProfile: build.mutation<void, ProfileRateParams>({
            query: (args) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: args,
            }),
        }),
    }),
});

export const useProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
