import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}
export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;

    const { data, isLoading: isNotificationsLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isNotificationsLoading) {
        return (
            <VStack
                className={classNames('', {}, [className])}
                gap="16"
                max
            >
                <Skeleton width="100%" height="80px" border="8px" />
                <Skeleton width="100%" height="80px" border="8px" />
                <Skeleton width="100%" height="80px" border="8px" />
            </VStack>
        );
    }

    return (
        <VStack
            className={classNames('', {}, [className])}
            gap="16"
            max
        >
            {data?.map((item) => (
                <NotificationItem
                    item={item}
                    key={item.id}
                />
            ))}
        </VStack>
    );
});
