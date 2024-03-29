import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Page } from '@/widgets/Page';

import { VStack } from '@/shared/ui/Stack';
import { initeArticlesPage } from '../../model/services/initeArticlesPage/initeArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage/fetchNextArticlePage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { useArticleItemById } from '../../model/selectors/articlePageSelectors';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';

interface ArticlesPageProps {
    className?: string;
}
const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const data = useArticleItemById('7');
    console.log('data', data);

    const reducers: ReducersList = {
        articlesPage: articlesPageReducer,
    };

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initeArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader
            name="articlesPage"
            reducers={reducers}
            removeAfterUnmount={false}
        >
            <Page
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <VStack gap="16">
                    <ArticlePageFilters />
                    <ArticleInfiniteList />
                </VStack>
                <ArticlePageGreeting />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
