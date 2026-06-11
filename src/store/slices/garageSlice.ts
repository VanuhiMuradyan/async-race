import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type GetCarsResponse, type Car, type CreateCarData } from "../../lib/types";
import { createCar, deleteCar, getCars, updateCar } from "../../lib/api/garage";
import { deleteWinner } from "../../lib/api/winners";
import { PAGE_LIMIT } from "../../lib/constants";

interface GarageState {
    cars: Car[],
    total: number,
    page: number,
    selectedCar: Car | null,
    loading: boolean,
    error: string | null,
};

const initialState: GarageState = {
    cars: [],
    total: 0,
    page: 1,
    selectedCar: null,
    loading: false,
    error: null,
};

export const fetchCars  = createAsyncThunk<GetCarsResponse, number> ( 
    'garage/fetchCars',
    async(page) => getCars(page)
);

export const addCar = createAsyncThunk<Car, CreateCarData> (
    'garage/addCar',
    async(data) => createCar(data)
);

export const editCar = createAsyncThunk<Car, {id: number, data: CreateCarData}> (
    'garage/editCar',
    async({id, data}) => updateCar(id, data)
);

export const removeCar = createAsyncThunk<number, number> (
    'garage/removeCar',
    async (id) => {
        await deleteCar(id);
        try {
          await deleteWinner(id);
        } catch {}
        
      return id;
    }
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: { selectCar: (state, action: PayloadAction<Car | null>) => {
      state.selectedCar = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },

  extraReducers:    (builder) => {
    builder   
      .addCase(fetchCars.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(fetchCars.fulfilled, (state, action) => {
          state.loading = false;
          state.cars = action.payload.cars;
          state.total = action.payload.total;
        })
     .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching cars';
      })

      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        state.total += 1;
      })

      .addCase(editCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex((car) => car.id === action.payload.id);
        if (index !== -1) {state.cars[index] = action.payload;
            state.selectedCar = null;
       }
      })

      .addCase(removeCar.fulfilled,(state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
        state.total -= 1;

        const totalPages = Math.ceil(state.total / PAGE_LIMIT);
          if (state.page > totalPages && state.page > 1) {
            state.page -= 1;
          }
    })
  }
})

export const { selectCar, setPage } = garageSlice.actions;
export default garageSlice.reducer;
