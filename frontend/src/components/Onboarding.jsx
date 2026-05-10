import { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Onboarding({ onComplete }) {
  const [prefs, setPrefs] = useState({
    age: '',
    status: 'Mahasiswa',
    communicationStyle: 'Casual',
    hobbies: [],
    triggers: []
  });
  const triggerOptions = ['Work stress', 'Relationship', 'Family', 'Finance', 'Health'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid, "profile", "preferences"), {
        ...prefs,
        updatedAt: new Date()
      });
      onComplete();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm mt-10">
      <h2 className="text-2xl font-bold text-[#D4956A] mb-4">Kenalan Yuk! 🌿</h2>
      <p className="text-sm text-gray-500 mb-6">Agar aku bisa jadi teman curhat yang lebih baik buat kamu.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Status Saat Ini</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={prefs.status}
            onChange={(e) => setPrefs({...prefs, status: e.target.value})}
          >
            <option>Mahasiswa</option>
            <option>Bekerja</option>
            <option>Entrepreneur</option>
            <option>Mencari Kerja</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Gaya Komunikasi</label>
          <div className="flex gap-4 mt-2">
            {['Casual', 'Formal'].map(style => (
              <button 
                key={style}
                type="button"
                onClick={() => setPrefs({...prefs, communicationStyle: style})}
                className={`px-4 py-2 rounded-full border ${prefs.communicationStyle === style ? 'bg-[#D4956A] text-white' : ''}`}
              >
                {style === 'Casual' ? 'Santai (Gue/Lo)' : 'Formal (Saya/Anda)'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Apa yang biasanya membuatmu stress?</label>
          <div className="flex flex-wrap gap-2">
            {triggerOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const newTriggers = prefs.triggers.includes(opt)
                    ? prefs.triggers.filter(t => t !== opt)
                    : [...prefs.triggers, opt];
                  setPrefs({ ...prefs, triggers: newTriggers });
                }}
                className={`px-3 py-1 text-xs rounded-full border ${prefs.triggers.includes(opt) ? 'bg-[#8FA998] text-white' : 'text-gray-500'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-3 bg-[#D4956A] text-white rounded-xl font-bold hover:opacity-90 transition">
          Selesai & Mulai Curhat
        </button>
      </form>
    </div>
  );
}