import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/CounterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
    const { t } = useTranslation();

    // const dispatch = useDispatch();
    // const counterValue = useSelector(getCounterValue); useCounterValue
    const counterValue = useCounterValue();
    const { decrement: counterDecrement, increment: counterIncrement } = useCounterActions();

    const increment = () => {
        // dispatch(counterActions.increment());
        counterIncrement();
    };

    const decrement = () => {
        // dispatch(counterActions.decrement());
        counterDecrement();
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                data-testid="increment-btn"
                onClick={increment}
            >
                {t('increment')}
            </Button>
            <Button
                data-testid="decrement-btn"
                onClick={decrement}
            >
                {t('decrement')}
            </Button>
        </div>
    );
};
