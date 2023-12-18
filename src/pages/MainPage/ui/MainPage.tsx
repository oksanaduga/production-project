import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { ListBox } from '@/shared/ui/Popups';
import { Page } from '@/widgets/Page/Page';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page>
            <BugButton />
            {t('mainPage')}
        </Page>
    );
});

export default MainPage;
