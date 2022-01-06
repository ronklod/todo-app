import { configureStore } from '@reduxjs/toolkit';
import todoRedcuer from '../features/Board/todoSlice';

export const store = configureStore({
    reducer: {
        todo: todoRedcuer,
    },
});


