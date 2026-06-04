import { Header } from './components/layout/header';
import AppRoutes from './routes';

const App = () => (
  <div style={{
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)',
    color: 'white',
    fontFamily: '"Rajdhani", sans-serif',
  }}>
    <link
      href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <Header />
    <main style={{ padding: '32px', flex: 1, overflow: 'auto' }}>
      <AppRoutes />
    </main>
  </div>
);

export default App;