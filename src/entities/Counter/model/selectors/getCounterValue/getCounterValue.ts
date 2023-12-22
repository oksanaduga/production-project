// import { createSelector } from 'reselect';
// import { getCounter } from '../getCounter/getCounter';
// import { CounterSchema } from '../../types/CounterSchema';
import { buildSelector } from '@/shared/lib/store';

// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: CounterSchema) => counter.value,
// );

export const [useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value);
