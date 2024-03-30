import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './userSlice'

const store = configureStore({
    reducer: {
        userData: userDataReducer,
    },
});

export default store;
