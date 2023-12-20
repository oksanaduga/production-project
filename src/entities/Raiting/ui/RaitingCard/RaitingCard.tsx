import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RaitingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}
export const RaitingCard = memo((props: RaitingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate ?? 0);
    const [feedback, setFeedback] = useState('');

    const { t } = useTranslation();

    const onSelectStars = useCallback((stars: number) => {
        setStarsCount(stars);

        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(stars);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('feedback')}
                onChange={setFeedback}
                value={feedback}
            />
        </>
    );

    const rateTitle = starsCount ? t('thanksForFeedback') : title;

    return (
        <Card className={classNames('', {}, [className])} max>
            <VStack align="center" gap="8">
                <Text title={rateTitle} />
                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    {modalContent}
                    <HStack max gap="16" justify="end">
                        <Button
                            onClick={cancelHandler}
                            theme={ButtonTheme.OUTLINE_RED}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            onClick={acceptHandler}
                        >
                            {t('send')}
                        </Button>
                    </HStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer
                    isOpen={isModalOpen}
                    onClose={cancelHandler}
                    lazy
                >
                    <VStack max gap="8">
                        {modalContent}
                        <Button
                            onClick={acceptHandler}
                            fullWidth
                        >
                            {t('send')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
