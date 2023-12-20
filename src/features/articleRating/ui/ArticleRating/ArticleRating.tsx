import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RaitingCard } from '@/entities/Raiting';
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}
const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;

    const authData = useSelector(getUserAuthData);

    const { t } = useTranslation('article');
    const { data, isLoading, error } = useGetArticleRating({
        articleId,
        userId: authData?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: authData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback: feedback ?? '',
            });
        } catch (e) {
            console.log(e);
        }
    }, [articleId, authData?.id, rateArticleMutation]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    if (isLoading) {
        return <Skeleton width="100%" height="200px" />;
    }

    if (error) {
        return null;
    }

    const rating = data?.[0];

    return (
        <RaitingCard
            className={className}
            title={t('rateArticle')}
            feedbackTitle={t('writeFeedback')}
            hasFeedback
            rate={rating?.rate}
            onCancel={onCancel}
            onAccept={onAccept}
        />
    );
});

export default ArticleRating;
