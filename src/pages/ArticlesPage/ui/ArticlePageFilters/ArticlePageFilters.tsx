import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    ArticleView, ArticleViewSelector, ArticleSortSelector, ArticleSortField,
    ArticleType,
    ArticleTypeTabs,
} from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { HStack } from '@/shared/ui/Stack';
import { fetchArticlesList } from '../../model/services/fetchArticleList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlePageFilters.module.scss';

interface ArticlePageFiltersProps {
    className?: string;
}
export const ArticlePageFilters = memo((props: ArticlePageFiltersProps) => {
    const { className } = props;

    const { t } = useTranslation('filters');
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
        dispatch(articlesPageActions.initState());
    }, [dispatch]);

    const onChangeSort = useCallback((sortBy: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sortBy));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((orderBy: SortOrder) => {
        dispatch(articlesPageActions.setOrder(orderBy));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [debouncedFetchData, dispatch]);

    const onChangeType = useCallback((type: ArticleType) => {
        dispatch(articlesPageActions.setType(type));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <>
            <HStack
                max
                justify="between"
            >
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </HStack>
            <Card className={cls.search}>
                <Input
                    placeholder={t('search')}
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </>
    );
});
