import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

interface ForbiddenPageProps {
    className?: string;
}
export const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
    const { t } = useTranslation();

    return (
        <Page className={classNames('', {}, [className])}>
            {t('accessDenied')}
        </Page>
    );
};
