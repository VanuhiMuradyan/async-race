import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { driveMode, startEngine, stopEngine } from "../lib/api/engine";
import { setCarRaceStatus, setWinner } from "../store/slices/raceSlice";
import { MS_IN_SECOND } from "../lib/constants";

export const useEngine = () => {
    const dispatch = useDispatch<AppDispatch>();

    const startCar = async(carId: number): Promise<void> => {
        const {velocity, distance} = await startEngine(carId);

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
    };

    const stopCar = async(carId: number): Promise<void> => {
        await stopEngine(carId);

        dispatch(setCarRaceStatus({carId, status: 'idle', duration: 0}))
    };

    return {startCar, stopCar}
}

