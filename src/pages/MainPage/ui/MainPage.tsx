import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RaitingCard } from '@/entities/Raiting';

const MainPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page>
            <BugButton />
            {t('mainPage')}
            <RaitingCard
                title="Как вам статья?"
                feedbackTitle="Оставьте фидбек"
                hasFeedback
            />
        </Page>
    );
});

export default MainPage;
