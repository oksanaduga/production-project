import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}
const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;

    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    console.log('id', id);
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit ? t('editArticlePage') + id : t('createArticlePage')}
        </Page>
    );
});

export default ArticleEditPage;
