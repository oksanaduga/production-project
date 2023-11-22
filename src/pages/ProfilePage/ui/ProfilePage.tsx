import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { DinamicModuleLoader, ReducersList } from 'shared/lib/components/DinamicModuleLoader/DinamicModuleLoader';
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}
const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DinamicModuleLoader
            name="profile"
            reducers={reducers}
            removeAfterUnmount
        >
            <div className={classNames('', {}, [className])}>
                <ProfileCard />
            </div>
        </DinamicModuleLoader>
    );
});

export default ProfilePage;
