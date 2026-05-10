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
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [hasProfile, setHasProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking Auth State...");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          console.log("User detected:", currentUser.uid);
          setUser(currentUser);
          
          // Cek Profile
          const docRef = doc(db, "users", currentUser.uid, "profile", "preferences");
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log("Profile found!");
            setHasProfile(true);
          } else {
            console.log("Profile NOT found, need onboarding.");
            setHasProfile(false);
          }
        } else {
          console.log("No user detected.");
          setUser(null);
          setHasProfile(null);
        }
      } catch (error) {
        console.error("Error in Auth/Firestore check:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 1. Sedang Loading
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FCF9F7]">
        <div className="text-4xl animate-bounce mb-4">🌿</div>
        <div className="text-[#D4956A] font-bold">Menghubungkan ke Teman Dengar...</div>
      </div>
    );
  }

  // 2. Belum Login
  if (!user) {
    return <Login />;
  }

  // 3. Sudah Login tapi Belum isi Onboarding
  if (hasProfile === false) {
    return <Onboarding onComplete={() => setHasProfile(true)} />;
  }

  // 4. Sudah Login & Sudah isi Onboarding -> Masuk App Utama
  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#FCF9F7]">
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <Link to="/" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A] active:scale-90 transition">
            <span className="text-xl">🏠</span>
            <span className="text-[10px] mt-1 font-bold italic uppercase tracking-wider">Home</span>
          </Link>
          <Link to="/chat" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A] active:scale-90 transition">
            <span className="text-xl">💬</span>
            <span className="text-[10px] mt-1 font-bold italic uppercase tracking-wider">Curhat</span>
          </Link>
          <Link to="/mood" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A] active:scale-90 transition">
            <span className="text-xl">📊</span>
            <span className="text-[10px] mt-1 font-bold italic uppercase tracking-wider">Mood</span>
          </Link>
          <Link to="/goals" className="flex flex-col items-center text-gray-400 focus:text-[#D4956A] active:scale-90 transition">
            <span className="text-xl">🎯</span>
            <span className="text-[10px] mt-1 font-bold italic uppercase tracking-wider">Goals</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}

export default App;