import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchWinners, setWinnersPage, toggleSort } from '../store/slices/winnersSlice';
import { WINNERS_PAGE_LIMIT } from '../lib/constants';
import type { SortField } from '../lib/types';
import { CarSvg } from './carSvg';

const thStyle = (isActive: boolean, sortable: boolean): React.CSSProperties => ({
  padding: '12px 16px',
  fontFamily: '"Orbitron", sans-serif',
  fontSize: '10px',
  letterSpacing: '2px',
  color: isActive ? '#ff6b00' : 'rgba(255,255,255,0.4)',
  cursor: sortable ? 'pointer' : 'default',
  textAlign: 'left',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  userSelect: 'none',
});

export const WinnersTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const winners = useSelector((state: RootState) => state.winners.winners);
  const total   = useSelector((state: RootState) => state.winners.total);
  const page    = useSelector((state: RootState) => state.winners.page);
  const sort    = useSelector((state: RootState) => state.winners.sort);
  const order   = useSelector((state: RootState) => state.winners.order);
  const loading = useSelector((state: RootState) => state.winners.loading);

  useEffect(() => {
    dispatch(fetchWinners({ page, sort, order }));
  }, [dispatch, page, sort, order]);

  const totalPages = Math.ceil(total / WINNERS_PAGE_LIMIT);

  const sortIcon = (field: SortField) => {
    if (sort !== field) return '';
    return order === 'ASC' ? ' ↑' : ' ↓';
  };

  if (loading) return (
    <div style={{
      color: 'rgba(255,255,255,0.3)',
      fontFamily: '"Orbitron", sans-serif',
      padding: '32px',
      textAlign: 'center',
      letterSpacing: '4px',
    }}>
      LOADING...
    </div>
  );

  return (
    <div>
      <div style={{
        fontFamily: '"Orbitron", sans-serif',
        fontSize: '11px',
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.3)',
        marginBottom: '24px',
      }}>
        TOTAL: {total} — PAGE {page}/{totalPages || 1}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle(false, false)}>№</th>
            <th style={thStyle(false, false)}>CAR</th>
            <th style={thStyle(false, false)}>NAME</th>
            <th
              style={thStyle(sort === 'wins', true)}
              onClick={() => dispatch(toggleSort('wins'))}
            >
              WINS{sortIcon('wins')}
            </th>
            <th
              style={thStyle(sort === 'time', true)}
              onClick={() => dispatch(toggleSort('time'))}
            >
              BEST TIME{sortIcon('time')}
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.length === 0 ? (
            <tr>
              <td colSpan={5} style={{
                padding: '32px',
                textAlign: 'center',
                fontFamily: '"Orbitron", sans-serif',
                fontSize: '12px',
                letterSpacing: '4px',
                color: 'rgba(255,255,255,0.2)',
              }}>
                NO WINNERS YET
              </td>
            </tr>
          ) : (
            winners.map((winner, index) => (
              <tr key={winner.id} style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: index % 2 === 0
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
              }}>
                <td style={{
                  padding: '12px 16px',
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {(page - 1) * WINNERS_PAGE_LIMIT+ index + 1}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <CarSvg color={winner.car.color} size={40} />
                </td>
                <td style={{
                  padding: '12px 16px',
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                  {winner.car.name}
                </td>
                <td style={{
                  padding: '12px 16px',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ff6b00',
                }}>
                  {winner.wins}
                </td>
                <td style={{
                  padding: '12px 16px',
                  fontFamily: '"Rajdhani", sans-serif',
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  {winner.time.toFixed(2)}s
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
        <button
          onClick={() => dispatch(setWinnersPage(page - 1))}
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
          onClick={() => dispatch(setWinnersPage(page + 1))}
          disabled={page >= totalPages}
          style={{
            padding: '8px 16px',
            fontFamily: '"Orbitron", sans-serif',
            fontSize: '11px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: page >= totalPages ? 'rgba(255,255,255,0.2)' : 'white',
            cursor: page >= totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

