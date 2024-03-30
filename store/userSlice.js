
import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
    name: 'userData',
    initialState: null,
    reducers: {
        setUserData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
