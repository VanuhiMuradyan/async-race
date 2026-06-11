import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { useEffect } from "react";
import { saveWinner } from "../lib/api/winners";
import { closeBanner } from "../store/slices/raceSlice";
import { createPortal } from "react-dom";

export const WinnerBanner = () => {
    const dispatch = useDispatch<AppDispatch>();

    const showBanner = useSelector((state: RootState) => state.race.showBanner);
    const winnerId = useSelector((state: RootState) => state.race.winnerId);
    const winnerTime = useSelector((state: RootState) => state.race.winnerTime);

    const winnerCar = useSelector((state: RootState) => 
        state.garage.cars.find((car) => car.id === winnerId)
    );

    useEffect(() => {
        if(winnerId && winnerTime) {
            saveWinner(winnerId, winnerTime);
        }
    }, [winnerId, winnerTime])

      if (!showBanner || !winnerCar) return null;

     return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
        }}>

        <div style={{
            background: 'linear-gradient(135deg, #0d1b2a, #1a0a2e)',
            border: '1px solid rgba(255,107,0,0.5)',
            padding: '48px 64px',
            textAlign: 'center',
      }}>

        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏆</div>

        <div style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '32px',
            fontWeight: 900,
            letterSpacing: '4px',
            background: 'linear-gradient(90deg, #ff6b00, #ff0080)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
            textTransform: 'uppercase',
        }}>
          {winnerCar.name}
        </div>

        <div style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '14px',
            letterSpacing: '6px',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '16px',
        }}>
          WINS THE RACE
        </div>

        <div style={{
            fontFamily: '"Rajdhani", sans-serif',
            fontSize: '20px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '32px',
        }}>
          Time: <span style={{ color: '#ff6b00', fontWeight: 700 }}>
            {winnerTime?.toFixed(2)}s
          </span>
        </div>

        <button
          onClick={() => dispatch(closeBanner())}
          style={{
            padding: '10px 32px',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '3px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
        >
          CLOSE
        </button>
      </div>
    </div>,
    document.body 
  );
};
