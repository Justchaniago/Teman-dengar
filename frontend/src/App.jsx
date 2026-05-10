// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Mood from './pages/Mood';
import Goals from './pages/Goals';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#FCF9F7]">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </main>

        {/* Bottom Navigation (Mobile First) */}
        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A]">
            <span className="text-xs mt-1 font-medium">🏠 Home</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A]">
            <span className="text-xs mt-1 font-medium">💬 Curhat</span>
          </Link>
          <Link to="/mood" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A]">
            <span className="text-xs mt-1 font-medium">📊 Mood</span>
          </Link>
          <Link to="/goals" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A]">
            <span className="text-xs mt-1 font-medium">🎯 Goals</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;