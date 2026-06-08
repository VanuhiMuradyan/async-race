import { httpPatch } from "../httpClient";
import type { EngineStatus } from "../types";

export const startEngine = async (id: number) : Promise<EngineStatus> => {
    const {data} = await httpPatch<EngineStatus>(
        `/engine?id=${id}&status=started`
    );

    return data;
};

export const stopEngine = async (id: number) : Promise<void> => {
    await httpPatch<void>(
        `/engine?id=${id}&status=stopped`
    );
};

export const driveMode = async (id: number) : Promise<boolean> => {
    try {
        await httpPatch<{success: boolean}>(
            `engine?id=${id}&status=drive`
        );
        return true;
    } catch (error) {
        return false
    };
};

