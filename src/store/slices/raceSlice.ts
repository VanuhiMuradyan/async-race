import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CarRaceStatus, RaceCarState } from "../../lib/types";

interface RaceState {
    cars: Record<number, RaceCarState>;
    isRacing: boolean;
    winnerId: number | null;
    winnerTime: number | null;
    showBanner: boolean;
};

const initialState: RaceState = {
    cars: {},
    isRacing: false,
    winnerId: null,
    winnerTime: null,
    showBanner: false
};

const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
        setCarRaceStatus : (
            state,
            action: PayloadAction<{carId : number; status: CarRaceStatus; duration?: number}>
        ) => {
            const {carId, status, duration} = action.payload;
            state.cars[carId] = {carId, status, duration: duration ?? 0}
        },

        setRacing: (state, action: PayloadAction<boolean>) => {
            state.isRacing = action.payload
        },

        setWinner: (state, action: PayloadAction<{id: number; time: number}>) => {
            if (state.winnerId === null) {
                state.winnerId = action.payload.id;
                state.winnerTime = action.payload.time;
                state.showBanner = true;
            }
        },

        closeBanner: (state) => {
            state.showBanner = false;
        },

        resetRace: (state) => {
            state.cars = {};
            state.isRacing = false;
            state.winnerId = null;
            state.winnerTime = null;
            state.showBanner= false;
        }
    }
})

export const { setCarRaceStatus, setRacing, setWinner, closeBanner, resetRace } = raceSlice.actions;
export default raceSlice.reducer;