import { useState, useEffect } from 'react';
import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import type { CreateCarData } from '../lib/types';
import { addCar, editCar, selectCar } from '../store/slices/garageSlice';
import { DEFAULT_COLOR } from '../lib/constants';

export const CarForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  

  const selectedCar = useSelector((state: RootState) => state.garage.selectedCar);

  const [name, setName] = useState('');
  const [color, setColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    if (selectedCar) {
      setName(selectedCar.name);
      setColor(selectedCar.color);
    } else {
      setName('');
      setColor(DEFAULT_COLOR);
    }
  }, [selectedCar]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const data: CreateCarData = { name: name.trim(), color };

    if (selectedCar) {
        dispatch(editCar({ id: selectedCar.id, data }));
    } else {
        dispatch(addCar(data));
    } 
    setName('');
    setColor(DEFAULT_COLOR);
  };

  const handleCancel = () => {
    dispatch(selectCar(null));
  };

  const isEditMode = Boolean(selectedCar);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      marginBottom: '8px',
    }}>

      <span style={{
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '10px',
        letterSpacing: '2px',
        color: isEditMode ? '#ff0080' : '#ff6b00',
        minWidth: '50px',
      }}>
        {isEditMode ? 'EDIT' : 'CREATE'}
      </span>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Car name..."
        maxLength={50}
        style={{
          flex: 0.95,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'white',
          padding: '8px 12px',
          fontFamily: '"Rajdhani", sans-serif',
          fontSize: '14px',
          outline: 'none',
        }}
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '18x',
          background: 'transparent',
          cursor: 'pointer',
          padding: 0,
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={!name.trim()}
        style={{
          padding: '8px 20px',
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '2px',
          background: isEditMode
            ? 'linear-gradient(135deg, #ff0080, #ff6b00)'
            : 'linear-gradient(135deg, #ff6b00, #ff0080)',
          border: 'none',
          color: 'white',
          cursor: name.trim() ? 'pointer' : 'not-allowed',
          opacity: name.trim() ? 1 : 0.4,
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
      >
        {isEditMode ? 'UPDATE' : 'CREATE'}
      </button>

      {isEditMode && (
        <button
          onClick={handleCancel}
          style={{
            padding: '8px 16px',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          }}
        >
          CANCEL
        </button>
      )}
    </div>
  );
};

