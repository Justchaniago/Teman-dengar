import { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({
    age: 20,
    status: 'Mahasiswa',
    communicationStyle: 'Casual',
    hobbies: [],
    triggers: [],
    goals: []
  });

  const hobbiesOptions = ['Gaming', 'Art', 'Sports', 'Music', 'Reading', 'Cooking', 'Travel'];
  const triggerOptions = ['Work stress', 'Relationship', 'Family', 'Finance', 'Health', 'Sleep'];
  const goalOptions = ['Better sleep', 'Confidence', 'Reduce anxiety', 'Career growth', 'Self-care'];

  const handleToggle = (listName, value) => {
    const currentList = prefs[listName];
    const newList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];
    setPrefs({ ...prefs, [listName]: newList });
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid, "profile", "preferences"), {
          ...prefs,
          updatedAt: new Date()
        });
        onComplete();
      } catch (err) {
        alert("Gagal menyimpan: " + err.message);
      }
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF9F7] p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-[#D4956A] transition-all duration-500" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-8 border border-orange-50">
        
        {/* STEP 1: Basic Identity */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500 text-left">
            <div>
              <h2 className="text-2xl font-bold text-[#4A3F35]">Kenalan dulu, yuk! 👋</h2>
              <p className="text-gray-400 text-sm">Biar aku bisa panggil kamu dengan akrab.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Berapa umur kamu?</label>
                <input 
                  type="number" 
                  value={prefs.age}
                  onChange={(e) => setPrefs({...prefs, age: e.target.value})}
                  className="w-full mt-2 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#D4956A]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Status kamu saat ini?</label>
                <select 
                  value={prefs.status}
                  onChange={(e) => setPrefs({...prefs, status: e.target.value})}
                  className="w-full mt-2 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#D4956A]"
                >
                  <option>Mahasiswa</option>
                  <option>Bekerja</option>
                  <option>Entrepreneur</option>
                  <option>Mencari Kerja</option>
                </select>
              </div>
            </div>
            <button onClick={nextStep} className="w-full py-4 bg-[#D4956A] text-white rounded-2xl font-bold shadow-lg shadow-orange-200">Lanjut</button>
          </div>
        )}

        {/* STEP 2: Lifestyle & Communication */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500 text-left">
            <div>
              <h2 className="text-2xl font-bold text-[#4A3F35]">Hobi & Gaya Bahasa 🎨</h2>
              <p className="text-gray-400 text-sm">Aku bakal menyesuaikan cara bicaraku.</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-600 block">Pilih hobi yang kamu suka:</label>
              <div className="flex flex-wrap gap-2">
                {hobbiesOptions.map(h => (
                  <button 
                    key={h}
                    onClick={() => handleToggle('hobbies', h)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition ${prefs.hobbies.includes(h) ? 'bg-[#8FA998] border-[#8FA998] text-white' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>

              <label className="text-sm font-semibold text-gray-600 block mt-4">Gaya Bicara Aku ke Kamu:</label>
              <div className="grid grid-cols-2 gap-3">
                {['Casual', 'Formal'].map(s => (
                  <button 
                    key={s}
                    onClick={() => setPrefs({...prefs, communicationStyle: s})}
                    className={`p-3 rounded-xl border text-sm font-bold transition ${prefs.communicationStyle === s ? 'bg-[#D4956A]/10 border-[#D4956A] text-[#D4956A]' : 'bg-gray-50 border-transparent text-gray-400'}`}
                  >
                    {s === 'Casual' ? 'Santai (Gue/Lo)' : 'Formal (Saya/Anda)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold">Kembali</button>
              <button onClick={nextStep} className="flex-[2] py-4 bg-[#D4956A] text-white rounded-2xl font-bold shadow-lg shadow-orange-200">Lanjut</button>
            </div>
          </div>
        )}

        {/* STEP 3: Triggers & Goals */}
        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500 text-left">
            <div>
              <h2 className="text-2xl font-bold text-[#4A3F35]">Hampir Selesai... ✨</h2>
              <p className="text-gray-400 text-sm">Apa yang ingin kamu capai di sini?</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-600 block">Apa yang sering bikin kamu cemas?</label>
              <div className="flex flex-wrap gap-2">
                {triggerOptions.map(t => (
                  <button 
                    key={t}
                    onClick={() => handleToggle('triggers', t)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition ${prefs.triggers.includes(t) ? 'bg-red-400 border-red-400 text-white' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="text-sm font-semibold text-gray-600 block mt-4">Tujuan utama kamu pakai Teman Dengar?</label>
              <div className="flex flex-wrap gap-2">
                {goalOptions.map(g => (
                  <button 
                    key={g}
                    onClick={() => handleToggle('goals', g)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition ${prefs.goals.includes(g) ? 'bg-[#D4956A] border-[#D4956A] text-white' : 'bg-white text-gray-500 border-gray-200'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold">Kembali</button>
              <button onClick={handleSubmit} className="flex-[2] py-4 bg-[#8FA998] text-white rounded-2xl font-bold shadow-lg shadow-green-100">Selesai & Mulai</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}