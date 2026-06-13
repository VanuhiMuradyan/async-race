import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { driveMode, startEngine, stopEngine } from "../lib/api/engine";
import { setCarRaceStatus, setWinner } from "../store/slices/raceSlice";
import { MS_IN_SECOND } from "../lib/constants";

export const useEngine = () => {
    const dispatch = useDispatch<AppDispatch>();

    const startCar = async(carId: number): Promise<void> => {
        try {
            const {velocity, distance} = await startEngine(carId);

            if (velocity === 0) {
                dispatch(setCarRaceStatus({carId, status: 'broken', duration: 0}));
                return;
            }

            const duration = distance / velocity;

            dispatch(setCarRaceStatus({carId, status: 'running', duration}));

            const success = await driveMode(carId);

            if(success) {
                const time = Math.round(duration / MS_IN_SECOND * 100) / 100;
                dispatch(setCarRaceStatus({carId, status: 'finished', duration}));
                dispatch(setWinner({id: carId, time}));
            } else {
                dispatch(setCarRaceStatus({carId, status: 'broken', duration}));
            }
        } catch (error) {
            console.error(`Error starting car ${carId}:`, error);
            dispatch(setCarRaceStatus({carId, status: 'broken', duration: 0}));
        }
    };

    const stopCar = async(carId: number): Promise<void> => {
        try {
            await stopEngine(carId);
            dispatch(setCarRaceStatus({carId, status: 'idle', duration: 0}));
        } catch (error) {
            console.error(`Error stopping car ${carId}:`, error);
            dispatch(setCarRaceStatus({carId, status: 'idle', duration: 0}));
        }
    };

    return {startCar, stopCar}
}

