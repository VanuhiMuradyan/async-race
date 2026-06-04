import type { CSSProperties } from "react";
import { useDispatch } from "react-redux";
import type { Car } from "../lib/types";
import { removeCar, selectCar } from "../store/slices/garageSlice";
import { CarSvg } from "./carSvg";
import type { AppDispatch } from "../store/store";

interface CarCardProps {
    car: Car;
}

const btnStyle = (color: string, disabled = false): CSSProperties => ({
  padding: '4px 10px',
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '1px',
  background: disabled ? 'rgba(255,255,255,0.05)' : color,
  border: `1px solid ${disabled ? 'rgba(255,255,255,0.1)' : color}`,
  color: disabled ? 'rgba(255,255,255,0.3)' : 'white',
  cursor: disabled ? 'not-allowed' : 'pointer',
  clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
  transition: 'all 0.2s ease',
});

export const CarCard = ({ car }: CarCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = () => dispatch(selectCar(car));

  const handleRemove = () => dispatch(removeCar(car.id));

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
    }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

        <button onClick={handleSelect} style={btnStyle('rgba(255,107,0,0.8)')}>
          SELECT
        </button>

        <button onClick={handleRemove} style={btnStyle('rgba(255,0,128,0.8)')}>
          REMOVE
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

        <button style={btnStyle('rgba(0,255,128,0.8)')}>
          A
        </button>

        <button style={btnStyle('rgba(0,128,255,0.8)', true)}>
          B
        </button>
      </div>

      <CarSvg color={car.color} size={60} />

      <span style={{
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '2px',
        color: 'rgba(255,255,255,0.9)',
        minWidth: '120px',
        textTransform: 'uppercase',
      }}>
        {car.name}
      </span>

      <div style={{
        flex: 1,              
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          position: 'absolute',
          right: 0,
          top: '-16px',
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '8px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.3)',
        }}>
          FINISH
        </div>
      </div>

    </div>
  );
};