import { Film, Sparkles, Star, Play } from 'lucide-react';

interface MainLandingProps {
  onStart: () => void;
}

export default function MainLanding({ onStart }: MainLandingProps) {
  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden relative font-sans">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { Icon: Film, color: "text-blue-400", pos: "top-[10%] left-[15%]", delay: "0s" },
          { Icon: Star, color: "text-yellow-400", pos: "top-[25%] right-[20%]", delay: "1s" },
          { Icon: Sparkles, color: "text-cyan-400", pos: "bottom-[30%] left-[10%]", delay: "2s" },
          { Icon: Play, color: "text-rose-400", pos: "bottom-[15%] right-[15%]", delay: "0.5s" },
          { Icon: Film, color: "text-emerald-400", pos: "top-[60%] right-[10%]", delay: "1.5s" },
        ].map((item, i) => (
          <div 
            key={i} 
            className={`absolute ${item.pos} animate-float opacity-20`}
            style={{ animationDelay: item.delay }}
          >
            <item.Icon size={40} className={item.color} />
          </div>
        ))}
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="mb-8 flex justify-center animate-fade-in-up">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-[2.5rem] shadow-2xl transition-transform hover:scale-110 duration-500">
              <Film className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            AI Movie Recommender
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Sparkles className="text-yellow-400" />
            <p className="text-xl md:text-2xl text-slate-300">Personalized picks powered by Gemini AI</p>
            <Sparkles className="text-yellow-400" />
          </div>

          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Discover hidden gems and timeless classics tailored to your mood. 
            No more endless scrolling—just perfect movies.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={onStart}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center group shadow-lg shadow-blue-500/20"
            >
              Get Started
              <Play className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onStart}
              className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold text-lg transition-all border border-slate-700 flex items-center justify-center"
            >
              Login
            </button>
          </div>

          {/* Minimal Feature Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            {[
              { icon: Sparkles, title: "Smart AI", desc: "Analyzes deep preferences", color: "text-blue-400" },
              { icon: Film, title: "Vast Library", desc: "Thousands of movie titles", color: "text-cyan-400" },
              { icon: Star, title: "Personalized", desc: "Tailored just for you", color: "text-rose-400" },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-800/40 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group">
                <feature.icon className={`w-10 h-10 mx-auto mb-4 ${feature.color} group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}