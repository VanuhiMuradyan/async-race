import { NavLink } from 'react-router-dom';

export const Header = () => (
  <header style={{
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  }}>
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[
        { to: '/garage', label: 'GARAGE' },
        { to: '/winners', label: 'WINNERS' },
      ].map(({ to, label }) => (
        <NavLink key={to} to={to} style={({ isActive }) => ({
          padding: '8px 20px',
          fontFamily: '"Orbitron", sans-serif',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '2px',
          textDecoration: 'none',
          border: isActive ? '1px solid #ff6b00' : '1px solid rgba(255,255,255,0.15)',
          background: isActive
            ? 'linear-gradient(135deg, rgba(255,107,0,0.2), rgba(255,0,128,0.1))'
            : 'transparent',
          color: isActive ? '#ff6b00' : 'rgba(255,255,255,0.5)',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          transition: 'all 0.2s ease',
        })}>
          {label}
        </NavLink>
      ))}
    </nav>

    <div style={{
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 900,
      fontSize: '22px',
      background: 'linear-gradient(90deg, #ff6b00, #ff0080)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '4px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    }}>
      ASYNC RACE
    </div>
  </header>
);

