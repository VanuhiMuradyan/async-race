import { GARAGE_PAGE_LIMIT } from "../constants";
import { httpDelete, httpGet, httpPost, httpPut } from "../httpClient";
import type { Car, CreateCarData, GetCarsResponse } from "../types";

export const getCars = async(page: number) : Promise<GetCarsResponse> => {
    const {data, headers} = await httpGet<Car[]>(
        `/garage?_page=${page}&_limit=${GARAGE_PAGE_LIMIT}`
    );

    const total = Number(headers.get('X-Total-Count') ?? 0);

    return {cars: data, total};
};

export const getCar = async(id: number) : Promise<Car> => {
    const {data} = await httpGet<Car>(`/garage/${id}`);
    return data;
};

export const createCar = async(data: CreateCarData) : Promise<Car> => {
    const {data: car} = await httpPost<Car>(`/garage`, data);
    return car;
};

export const updateCar = async(id: number, data: CreateCarData): Promise<Car> => {
    const {data: car} = await httpPut<Car>(`/garage/${id}`, data);
    return car;
};


export const deleteCar = async(id: number): Promise<void> => {
    await httpDelete<Car>(`/garage/${id}`)
};