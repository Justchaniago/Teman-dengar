import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Mood from './pages/Mood';
import Goals from './pages/Goals';
import Onboarding from './components/Onboarding';

function App() {
  const [user, setUser] = useState(null);
  const [hasProfile, setHasProfile] = useState(null); // null = loading, false = must onboarding
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Cek apakah sudah pernah isi onboarding
        const docRef = doc(db, "users", currentUser.uid, "profile", "preferences");
        const docSnap = await getDoc(docRef);
        setHasProfile(docSnap.exists());
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center text-[#D4956A] font-bold">Memuat Teman Dengar... 🌿</div>;

  // Jika belum login (Kamu bisa ganti ini dengan halaman Login nanti)
  if (!user) return <div className="p-10 text-center">Silakan Login/Gunakan Firebase Auth di sini.</div>;

  // Jika sudah login tapi belum isi onboarding
  if (hasProfile === false) {
    return <Onboarding onComplete={() => setHasProfile(true)} />;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#FCF9F7]">
        <main className="flex-1 overflow-y-auto p-4 pb-24 text-left">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-3 shadow-lg">
          <Link to="/" className="flex flex-col items-center text-gray-400 hover:text-[#D4956A]">🏠 <span className="text-[10px]">Home</span></Link>
          <Link to="/chat" className="flex flex-col items-center text-gray-400 hover:text-[#D4956A]">💬 <span className="text-[10px]">Curhat</span></Link>
          <Link to="/mood" className="flex flex-col items-center text-gray-400 hover:text-[#D4956A]">📊 <span className="text-[10px]">Mood</span></Link>
          <Link to="/goals" className="flex flex-col items-center text-gray-400 hover:text-[#D4956A]">🎯 <span className="text-[10px]">Goals</span></Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;