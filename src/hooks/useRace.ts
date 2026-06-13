import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEngine } from "./useEngine";
import { resetRace, setRacing } from "../store/slices/raceSlice";
import { RANDOM_CARS_COUNT } from "../lib/constants";
import { createCar } from "../lib/api/garage";
import { generateRandomCars } from "../lib/utils/randomCar";
import { fetchCars } from "../store/slices/garageSlice";

export const useRace = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {startCar, stopCar} = useEngine();

    const cars = useSelector((state: RootState) => state.garage.cars);
    const page = useSelector((state: RootState) => state.garage.page);

    const startRace =  async(): Promise<void> => {
        dispatch(setRacing(true));

        await Promise.all(cars.map((car) => startCar(car.id)));
    
        dispatch(setRacing(false));
    };
    
    const resetAllCars = async(): Promise<void> => {
        await Promise.all(cars.map((car) => stopCar(car.id)));

        dispatch(resetRace())
    };

    const generateCars = async(): Promise<void> => {
        const newCars = Array.from({length: RANDOM_CARS_COUNT}, generateRandomCars);

        await Promise.all(newCars.map((car) => createCar(car)));

        dispatch(fetchCars(page));
    };

    return {startRace, resetAllCars, generateCars};
}