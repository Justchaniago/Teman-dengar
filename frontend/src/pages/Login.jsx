import { auth } from '../lib/firebase';
import { signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login() {
  const loginAnon = () => signInAnonymously(auth);
  
  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#FCF9F7] relative overflow-hidden">
      
      {/* Dekorasi Background agar tidak polos (Lingkaran Estetik) */}
      <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#F4E3D7] rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-[#8FA998] rounded-full blur-3xl opacity-20"></div>

      <div className="z-10 w-full max-w-sm p-8 mx-4 bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl shadow-orange-900/5 border border-white flex flex-col items-center">
        
        {/* Logo & Header */}
        <div className="w-20 h-20 bg-[#F4E3D7] rounded-full flex items-center justify-center mb-6 shadow-inner">
          <span className="text-4xl">🌿</span>
        </div>
        
        <h1 className="text-3xl font-bold text-[#4A3F35] mb-2 tracking-tight">Teman Dengar</h1>
        <p className="text-[#6B6375] mb-10 text-sm leading-relaxed text-center px-4">
          Sahabat hangat yang siap mendengarkanmu kapan saja tanpa penghakiman.
        </p>
        
        {/* Buttons Group */}
        <div className="space-y-4 w-full">
          <button 
            onClick={loginGoogle}
            className="w-full py-4 px-6 bg-white border border-gray-100 rounded-2xl font-semibold text-[#4A3F35] flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 active:scale-95"
          >
            {/* SVG Google Icon yang pasti muncul */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c1.67-1.54 2.63-3.81 2.63-6.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Masuk dengan Google
          </button>

          <button 
            onClick={loginAnon}
            className="w-full py-4 px-6 bg-[#primary] rounded-2xl font-bold text-white shadow-lg shadow-orange-700/20 hover:bg-[#c38459] transition-all duration-300 active:scale-95 bg-[var(--primary)]"
          >
            Coba Sekarang (Anonim)
          </button>
        </div>

        {/* Footer Disclaimer */}
        <p className="mt-10 text-[10px] text-[#9CA3AF] uppercase tracking-widest text-center leading-loose">
          Aman • Privat • Terenkripsi
        </p>
      </div>

      <p className="absolute bottom-8 text-[11px] text-[#6B6375]/50 max-w-xs text-center px-4">
        Bukan pengganti bantuan profesional medis. Hubungi 119 jika butuh bantuan darurat.
      </p>
    </div>
  );
}