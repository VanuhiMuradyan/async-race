import { useSelector } from "react-redux";
import { useRace } from "../hooks/useRace";
import type { RootState } from "../store/store";

const btnStyle = (
        color: string,
        disabled: boolean
    ): React.CSSProperties => ({
        padding: '8px 20px',
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '2px',
        background: disabled ? 'rgba(255,255,255,0.05)' : color,
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.1)' : color}`,
        color: disabled ? 'rgba(255,255,255,0.3)' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        transition: 'all 0.2s ease',
});

export const RaceControls = () => {
    const {startRace, resetAllCars, generateCars} = useRace();

    const isRacing = useSelector((state: RootState) => state.race.isRacing);

    return (
        <div style={{
            display: 'flex',
            gap: '12px',
            padding: '16px 0',
            marginBottom: '16px',
        }}>

        <button
            onClick={startRace}
            disabled={isRacing}
            style={btnStyle('linear-gradient(135deg, #ff6b00, #ff0080)', isRacing)}
        >
            ▶ RACE
        </button>

        <button
            onClick={resetAllCars}
            disabled={isRacing}
            style={btnStyle('rgba(255,255,255,0.15)', isRacing)}
        >
            ↺ RESET
        </button>

        <button
            onClick={generateCars}
            disabled={isRacing}
            style={{
                ...btnStyle('rgba(0,200,100,0.6)', isRacing),
                marginLeft: 'auto'    
            }
            }
        >
            GENERATE CARS
        </button>
        </div>
    );
};
