import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import MainLanding from './components/MainLanding'; 

function App() {
  const { token, loading } = useAuth();
  
  // Track if we should show the Auth (Login/Register) screen
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // 1. If user is logged in, show the Dashboard
  if (token) {
    return <Dashboard />;
  }

  // 2. If "Get Started" or "Login" was clicked, show LandingPage with a Back button
  if (showAuth) {
    return <LandingPage onBack={() => setShowAuth(false)} />;
  }

  // 3. Default state: Show the beautiful Main Landing Page
  return <MainLanding onStart={() => setShowAuth(true)} />;
}

export default App;