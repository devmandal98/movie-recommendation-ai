import { useState, useEffect } from "react";
import axios from "axios";
import { Film, LogOut, Sparkles, Clock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = "http://127.0.0.1:8000";

interface Movie {
  title: string;
  description: string;
}

interface SearchHistory {
  id: number;
  user_input: string;
  created_at: string;
}

export default function Dashboard() {
  const [preference, setPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [history, setHistory] = useState<SearchHistory[]>([]);

  const { token, signOut } = useAuth();

  // 🔹 Load history only AFTER token is ready
  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/recommend/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const getRecommendations = async () => {
    if (!preference.trim() || !token) return;

    setLoading(true);
    try {
     const res = await axios.post(
  `${API_BASE}/recommend/`,
  null, // ✅ NO BODY
  {
    params: { user_input: preference }, // ✅ QUERY PARAM
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setMovies(res.data.recommendations);
      fetchHistory(); // refresh history after new search
    } catch (err) {
      console.error("Failed to fetch recommendations", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getRecommendations();
  };

  const loadHistorySearch = (query: string) => {
    setPreference(query);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-gray-900 to-red-900/10" />

      {/* NAVBAR */}
      <nav className="relative z-10 bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-red-500 rounded-xl flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
              AI Movie Recommender
            </span>
          </div>

          <button
            onClick={signOut}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm text-gray-300">
                What kind of movie are you in the mood for?
              </label>

              <input
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white"
                placeholder="e.g. action thriller, sci-fi adventure"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5" />
                <span>{loading ? "Finding Movies..." : "Get Recommendations"}</span>
              </button>
            </form>
          </div>

          {/* RESULTS */}
          {movies.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span>Recommended For You</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {movies.map((movie, i) => (
                  <div
                    key={i}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {movie.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Recent Searches</span>
            </h3>

            {history.length === 0 ? (
              <p className="text-gray-400 text-sm text-center">
                No search history yet
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadHistorySearch(item.user_input)}
                    className="w-full text-left px-3 py-2 bg-gray-900/50 hover:bg-gray-700/50 rounded-lg text-gray-300 hover:text-white text-sm"
                  >
                    <div className="font-medium truncate">
                      {item.user_input}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.created_at
    ? new Date(item.created_at).toLocaleString()
    : "Unknown time"}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
