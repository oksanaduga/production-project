import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from 'entities/Article';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { getArticles } from '../../model/slice/articlesPageSlice';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';

interface ArticleInfiniteListProps {
    className?: string;
}
export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props;

    const { t } = useTranslation('article');

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) {
        return (
            <Text
                title={t('unexpectedError')}
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
            />
        );
    }

    return (
        <ArticleList
            view={view}
            isLoading={isLoading}
            articles={articles}
            className={className}
        />
    );
});
