import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ToggleFeatures, getFeatureFlags } from '@/shared/lib/features';
import { Card } from '@/shared/ui/Card';
import { ArticleRating } from '@/features/articleRating';

interface ArticleDetailsPageProps {
    className?: string;
}
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();

    const reducers: ReducersList = {
        articleDetailsPage: articleDetailsPageReducer,
    };

    const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled');
    const isCounterEnabled = getFeatureFlags('isCoounterEnabled');

    // const counter = toggleFeatures({
    //     name: 'isCoounterEnabled',
    //     on: () => <Counter />,
    //     off: () => <div>qwe</div>,
    // });

    // toggleFeatures({
    //     name: 'isCoounterEnabled',
    //     on: () => console.log('new'),
    //     off: () => console.log('old'),
    // });

    if (!id) {
        return null;
    }

    // const articleRatingCard = toggleFeatures({
    //     name: 'isArticleRatingEnabled',
    //     on: () => <ArticleRating articleId={id} />,
    //     off: () => <Card>Оценка статей скоро появится</Card>,
    // });

    return (
        <DynamicModuleLoader
            name="articleDetailsPage"
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={classNames('', {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ToggleFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={<Card>Оценка статей скоро появится</Card>}
                    />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
