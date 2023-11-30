import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticleDetails.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsPageProps {
    className?: string;
}
const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const reducers: ReducersList = {
        articleDetailsComments: articleDetailsCommentsReducer,
    };

    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

    const onSendComment = useCallback((value: string) => {
        dispatch(addCommentForArticle(value));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Text
                    text={t('articleNotFound')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <DynamicModuleLoader
            name="articleDetailsComments"
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={classNames('', {}, [className])}>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onBackToList}
                >
                    {t('backToList')}
                </Button>
                <ArticleDetails id={id} />
                <Text
                    title={t('articleComments')}
                    className={cls.commentTitle}
                />
                <AddCommentForm
                    onSendComment={onSendComment}
                />
                <CommentList
                    comments={comments}
                    isLoading={commentsIsLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
