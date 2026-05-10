import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  // Ambil history chat real-time
  useEffect(() => {
    const q = query(collection(db, `users/${auth.currentUser.uid}/chatMessages`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(doc => doc.data()));
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/api/chat', {
        userId: auth.currentUser.uid,
        message: userMsg
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-[#4A3F35] mb-4 flex items-center gap-2">
        <span className="p-2 bg-orange-100 rounded-full">💬</span> Curhat
      </h1>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
              m.role === 'user' 
                ? 'bg-[#D4956A] text-white rounded-tr-none' 
                : 'bg-white text-[#4A3F35] rounded-tl-none border border-orange-50'
            }`}>
              {m.content}
              <span className="text-[11px] opacity-70 mt-2 block">
                {m.role === 'user' ? 'Kamu' : 'Teman Dengar'}
              </span>
              <span className="text-[10px] opacity-50 mt-1 block">
                {m.timestamp?.seconds ? format(m.timestamp.toDate(), 'HH:mm', { locale: id }) : 'Baru saja'}
              </span>
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400 animate-pulse">Teman Dengar sedang mengetik...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="mt-4 flex gap-2 relative">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ceritain apa aja..."
          className="flex-1 p-4 bg-white border border-orange-100 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#D4956A] text-sm"
        />
        <button type="submit" className="p-4 bg-[#D4956A] text-white rounded-2xl shadow-lg active:scale-95 transition">
          🚀
        </button>
      </form>
    </div>
  );
}