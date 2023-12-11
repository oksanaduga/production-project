const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => {
    const upperCase = firstCharUpperCase(sliceName);
    const typeName = `${upperCase}Schema`;

    return `import { PayloadAction, createSlice } from '@reduxjs/toolkit';
    import { ${typeName} } from '../types/${sliceName}Schema';
    
    const initialState: ${typeName} = {
    };

    export const ${sliceName}Slice = createSlice({
        name: '${sliceName}',
        initialState,
        reducers: {},
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(.fulfilled, (state, action: PayloadAction<Article>) => {
        //             state.isLoading = false;
        //         })
        //         .addCase(.rejected, (state, action) => {
        //             state.error = action.payload;
        //             state.isLoading = false;
        //         });
        // },
    });
    
    export const { actions: ${sliceName}Actions } = ${sliceName}Slice;
    export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
    `;
};
