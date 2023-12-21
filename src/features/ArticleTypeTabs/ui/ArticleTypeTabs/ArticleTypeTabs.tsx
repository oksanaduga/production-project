import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { ArticleType } from '../../../../entities/Article/model/consts/consts';

interface ArticleTypeTabsProps {
    className?: string;
    value: string;
    onChangeType: (tab: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const {
        className,
        value,
        onChangeType,
    } = props;

    const { t } = useTranslation('filters');

    const typeTabs = useMemo<TabItem<ArticleType>[]>(() => [
        {
            value: ArticleType.IT,
            content: t('itArticles'),
        },
        {
            value: ArticleType.ALL,
            content: t('allArticles'),
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('economicsArticles'),
        },
        {
            value: ArticleType.SCIENCE,
            content: t('scienceArticles'),
        },
    ], [t]);

    const onTabClick = useCallback((tab: TabItem<ArticleType>) => {
        onChangeType(tab.value);
    }, [onChangeType]);

    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
        />
    );
});
