import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './slices/garageSlice';
import raceReducer from './slices/raceSlice'

const store = configureStore({
  reducer: {
    garage: garageReducer,
    race: raceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;