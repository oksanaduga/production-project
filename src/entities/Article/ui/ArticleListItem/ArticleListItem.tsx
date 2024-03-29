import { useTranslation } from 'react-i18next';
import {
    HTMLAttributeAnchorTarget, memo,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { Icon } from '@/shared/ui/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg?react';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/AppLink';
import { ArticleView, ArticleBlockType } from '../../model/consts/consts';
import cls from './ArticleListItem.module.scss';
import {
    Article, ArticleTextBlock,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TestProps } from '@/shared/types/tests';

interface ArticleListItemProps extends TestProps {
    className?: string;
    article: Article;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}
export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL,
        target,
        'data-testid': dataTestId = 'ArticleListItem',
    } = props;

    // const [isHover, bindHover] = useHover();
    // console.log('ishover', isHover);

    const { t } = useTranslation('article');

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <>
            <Text
                text={String(article.views)}
                className={cls.views}
                data-testid="ArticleListItem.views"
            />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
                data-testid={dataTestId}
            >
                <Card>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    <AppImage
                        fallback={<Skeleton width="100%" height="250px" />}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('readMore')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            // {...bindHover}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            target={target}
            data-testid={dataTestId}
        >
            <Card>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width="200px" height="200px" />}
                        alt="article_image"
                        src={article.img}
                        className={cls.img}
                    />
                    <Text
                        text={article.createdAt}
                        className={cls.date}
                    />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});
