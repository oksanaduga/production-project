import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import cls from './ErrorPage.module.scss';

export const ErrorPage = () => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (
        <div className={classNames(cls.ErrorPage)}>
            <p>{t('unexpectedError')}</p>
            <Button onClick={reloadPage}>
                {t('reloadPage')}
            </Button>
        </div>
    );
};
