import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './slices/garageSlice';

const store = configureStore({
  reducer: {
    garage: garageReducer
    // race և winners slice-երը հետո կավելացնենք
  },
});


export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;

export default store;