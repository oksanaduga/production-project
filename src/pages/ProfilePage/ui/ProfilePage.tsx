import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { DinamicModuleLoader, ReducerList } from 'shared/lib/components/DinamicModuleLoader/DinamicModuleLoader';
import { profileReducer } from 'entities/Profile';

const reducers: ReducerList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}
const ProfilePage = memo(({ className }: ProfilePageProps) => (
    <DinamicModuleLoader
        name="profile"
        reducers={reducers}
        removeAfterUnmount
    >
        <div className={classNames('', {}, [className])}>
            PROFILE PAGE
        </div>
    </DinamicModuleLoader>
));

export default ProfilePage;
