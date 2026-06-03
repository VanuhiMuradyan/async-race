export interface Car {
    id: number;
    name: string;
    color: string;
};

export type CreateCarData = Omit<Car, "id">;

export interface GetCarsResponse {
    cars: Car[];
    total: number;
};