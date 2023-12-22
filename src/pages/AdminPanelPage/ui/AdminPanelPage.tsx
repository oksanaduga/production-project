import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
    className?: string;
}
const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
    const { t } = useTranslation();

    return (
        <Page className={classNames('', {}, [className])} data-testid="AdminPanelPage">
            admin str
        </Page>
    );
};

export default AdminPanelPage;
