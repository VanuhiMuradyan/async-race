import { CAR_BRANDS } from "../constants";
import type { CreateCarData } from "../types";

const randomItem = <T>(arr: T[]): T => 
    arr[Math.floor(Math.random() * arr.length)]

const randomColor = (): string => {
    const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')

    return `#${hex}`;
};

export const generateRandomCars = (): CreateCarData => ({
    name: `${randomItem(CAR_BRANDS)}`,
    color: randomColor()
});