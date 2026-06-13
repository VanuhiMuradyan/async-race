import { PAGE_LIMIT } from "../constants";
import { httpDelete, httpGet, httpPost, httpPut } from "../httpClient"
import type { GetWinnersResponse, SortField, SortOrder, Winner, WinnerWithCar } from "../types"
import { getCar } from "./garage";

export const getWinners = async (
    page: number,
    sort: SortField,
    order: SortOrder,
): Promise<GetWinnersResponse> => {
    const {data, headers} = await httpGet<Winner[]>(
        `/winners?_page=${page}&_limit=${PAGE_LIMIT}&_sort=${sort}&_order=${order}`
    );

    const total = Number(headers.get('X-Total-Count') ?? 0);

    const WinnerWithCars: WinnerWithCar[] = await Promise.all(
        data.map(async (winner) => ({
            ...winner,
            car: await getCar(winner.id)
        }))
    );

    return {winners: WinnerWithCars, total};
}

export const saveWinner = async(id: number, time: number): Promise<void> => {
    try {
        const {data: existing} = await httpGet<Winner>(`/winners/${id}`);

        await httpPut<Winner>(`/winners/${id}`, {
            wins: existing.wins + 1,
            time: Math.min(existing.time, time)
        });
    } catch {
        await httpPost<Winner>(`/winners`, {id, wins: 1, time})
    }
};

export const deleteWinner = async (id: number): Promise<void> => {
    await httpDelete(`winners/${id}`);
};