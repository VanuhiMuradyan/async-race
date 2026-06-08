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

export interface EngineStatus {
    velocity: number;
    distance: number;
};

export type CarRaceStatus = 'idle' | 'running' | 'broken' | 'finished';

export interface RaceCarStatus {
    carId: number;
    status: CarRaceStatus;
    duration: number;
};

export interface RaceCarState {
  carId: number;
  status: CarRaceStatus;
  duration: number;
};

