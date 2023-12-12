import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { useArticlesRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;

    const { t } = useTranslation();
    const { isLoading: recommendationsIsLoading, data: recommendations, error } = useArticlesRecommendationsList('3');

    if (recommendationsIsLoading || error) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('recommend')}
            />
            <ArticleList
                articles={recommendations}
                isLoading={recommendationsIsLoading}
                target="_blank"
            />
        </VStack>
    );
});
