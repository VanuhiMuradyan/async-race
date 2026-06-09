import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Car } from "../lib/types";
import { removeCar, selectCar } from "../store/slices/garageSlice";
import { CarSvg } from "./carSvg";
import type { AppDispatch, RootState } from "../store/store";
import { useEngine } from "../hooks/useEngine";
import { CAR_WIDTH } from "../lib/constants";

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
  const {startCar, stopCar} = useEngine();
  
  const trackRef = useRef<HTMLDivElement>(null);
  
  const carState = useSelector((state: RootState) => state.race.cars[car.id]);
  
  const status = carState?.status ?? 'idle';
  const duration = carState?.duration ?? 0;
  
  const isRunning = status === 'running';
  const isBroken = status === 'broken';
  const isFinished = status === 'finished';
  const isIdle = status === 'idle';

  const [moveDistance, setMoveDistance] = useState(0);
    useEffect(() => {
    if (trackRef.current) {
      setMoveDistance(trackRef.current.offsetWidth - CAR_WIDTH);
    }
  }, []);
  
  const handleSelect = () => dispatch(selectCar(car));
  const handleRemove = () => dispatch(removeCar(car.id));
  const handleStart = () => startCar(car.id);
  const handleStop = () => stopCar(car.id);

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

        <button 
          onClick={handleStart}
          disabled={!isIdle}
          style={btnStyle('rgba(0,255,128,0.8)', !isIdle)}>
          A
        </button>

        <button 
          onClick={handleStop}
          disabled={isIdle}
          style={btnStyle('rgba(0,128,255,0.8)', isIdle)}>
          B
        </button>
      </div>

      <div
        ref={trackRef}
        style={{
          flex: 1,
          position: 'relative',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '2px',
          left: '4px',
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '10px',
          letterSpacing: '2px',
          color: isBroken ? 'rgba(255,0,0,0.6)' : 'rgba(255,255,255,0.5)',
        }}>
          {car.name} {isBroken ? '💥' : ''}
        </span>

        <div style={{
          position: 'absolute',
          left: 0,

          transform: (isRunning || isBroken || isFinished)
            ? `translateX(${moveDistance}px)`
            : 'translateX(0)',
          transition: isRunning
            ? `transform ${duration}ms linear`
            : 'none',
        }}>
          <CarSvg color={car.color} size={CAR_WIDTH} />
        </div>

        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '2px',
          background: isFinished
            ? 'rgba(0,255,128,0.8)'
            : 'rgba(255,255,255,0.1)',
        }} />
        <span style={{
          position: 'absolute',
          right: '4px',
          top: '2px',
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '8px',
          letterSpacing: '2px',
          color: isFinished ? 'rgba(0,255,128,0.8)' : 'rgba(255,255,255,0.2)',
        }}>
          {isFinished ? '🏆' : 'FINISH'}
        </span>
      </div>
    </div>
  );
};
