import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddCommentForm.module.scss';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (value: string) => void;
}
const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;

    const { t } = useTranslation('comment');
    const dispatch = useAppDispatch();

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const reducers: ReducersList = {
        addCommentForm: addCommentFormReducer,
    };

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader
            name="addCommentForm"
            reducers={reducers}
        >
            <div className={classNames(cls.AddCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    value={text}
                    onChange={onCommentTextChange}
                    placeholder={t('commentTextPlace')}
                />
                <Button
                    onClick={onSendHandler}
                >
                    {t('send')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;