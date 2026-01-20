import { useAuth } from "./contexts/AuthContext";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

function App() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return token ? <Dashboard /> : <LandingPage />;
}

export default App;
