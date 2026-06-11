import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetWinnersResponse, SortField, SortOrder, WinnerWithCar } from "../../lib/types";
import { getWinners } from "../../lib/api/winners";

interface WinnersState {
    winners: WinnerWithCar[];
    total: number;
    page: number;
    sort: SortField;
    order: SortOrder;
    loading: boolean;
};

const initialState: WinnersState = {
    winners: [],
    total: 0,
    page: 1,
    sort: 'wins',
    order: 'DESC',
    loading: false
};

export const fetchWinners = createAsyncThunk<GetWinnersResponse, {page: number,sort: SortField, order: SortOrder}>(
    'winners/fetchWinners',
    async({page, sort, order}) => getWinners(page,sort,order)
);

const winnersSlice = createSlice({
    name: 'winners',
    initialState,
    reducers: {
    setWinnersPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    
    toggleSort: (state, action: PayloadAction<SortField>) => {
        if (state.sort === action.payload) {
            state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
        } else {
            state.sort = action.payload;
            state.order = 'DESC';
        }
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWinners.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWinners.fulfilled, (state, action) => {
                state.loading = false;
                state.winners = action.payload.winners;
                state.total = action.payload.total;
            })
            .addCase(fetchWinners.rejected, (state) => {
                state.loading = false;
            });
    },
},
)

export const { setWinnersPage, toggleSort } = winnersSlice.actions;
export default winnersSlice.reducer;