// import { createSlice } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/store';
import { CounterSchema } from '../types/CounterSchema';

const initialState: CounterSchema = {
    value: 0,
};

export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state: { value: number }) => {
            state.value += 1;
        },
        decrement: (state: { value: number }) => {
            state.value -= 1;
        },
    },
});

export const {
    actions: counterActions,
    reducer: counterReducer,
    useActions: useCounterActions,
} = counterSlice;
