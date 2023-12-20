import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RaitingCard } from '@/entities/Raiting';
import { useProfileRating, useRateProfile } from '../../api/profileRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

interface ProfileRatingProps {
    className?: string;
    profileId?: string
}
const ProfileRating = memo((props: ProfileRatingProps) => {
    const { className, profileId } = props;

    const { t } = useTranslation('profile');

    const authData = useSelector(getUserAuthData);

    const { data, isLoading, error } = useProfileRating({
        userId: authData?.id ?? '',
        profileId: profileId ?? '',
    });

    const [rateProfile] = useRateProfile();

    const onAccept = useCallback((starCount: number) => {
        try {
            rateProfile({
                userId: authData?.id ?? '',
                profileId: profileId ?? '',
                rate: starCount,
            });
        } catch (e) {
            console.log(e);
        }
    }, [authData?.id, profileId, rateProfile]);

    if (isLoading) {
        return <Skeleton width="100%" height="200" />;
    }

    if (error || !data) {
        return null;
    }

    const rate = data[0]?.rate ?? 0;

    return (
        <RaitingCard
            className={className}
            title={t('rateProfile')}
            onAccept={onAccept}
            rate={rate}
        />
    );
});

export default ProfileRating;
