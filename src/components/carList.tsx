import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react";
import { fetchCars, setPage } from "../store/slices/garageSlice";
import { PAGE_LIMIT } from "../lib/constants";
import { CarCard } from "./carCard";

export const CarList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const cars = useSelector((state: RootState) => state.garage.cars);
    const total = useSelector((state: RootState) => state.garage.total);
    const page = useSelector((state: RootState) => state.garage.page);
    const loading = useSelector((state: RootState) => state.garage.loading);

    useEffect(() => {
        dispatch(fetchCars(page));
    }, [dispatch, page]);

    const totalPages = Math.ceil(total / PAGE_LIMIT)

    if (loading) {
        return (
            <div style={{ color: 'rgba(255,255,255,0.3)', padding: '32px', textAlign: 'center' }}>
                Loading...
            </div>
        );
    };

      if (cars.length === 0) {
        return (
        <div style={{ color: 'rgba(255,255,255,0.3)', padding: '32px', textAlign: 'center',
            fontFamily: '"Orbitron", sans-serif', fontSize: '14px', letterSpacing: '4px' }}>
            NO CARS IN GARAGE
        </div>
        );
    };

    return (
        <>
        <div>
      <div style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.4)',
        fontFamily: '"Orbitron", sans-serif', fontSize: '11px', letterSpacing: '3px' }}>
        TOTAL: {total} CARS — PAGE {page}/{totalPages}
      </div>

      <div style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
          style={{
            padding: '8px 16px',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '11px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: page === 1 ? 'rgba(255,255,255,0.2)' : 'white',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          PREV
        </button>

        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page === totalPages}
          style={{
            padding: '8px 16px',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '11px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: page === totalPages ? 'rgba(255,255,255,0.2)' : 'white',
            cursor: page === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          NEXT
        </button>
      </div>
    </div>
        </>
    )

}   