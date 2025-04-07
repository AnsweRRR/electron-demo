import './App.css';
import { HashRouter as Router, useNavigate } from 'react-router-dom';
import AppRoutes from './routes';
import { useEffect } from 'react';

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = window.electron.subscribeChangePage((targetPath) => {
      navigate(targetPath);
    });

    return unsubscribe;
  }, [navigate]);

  return <AppRoutes />;
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;