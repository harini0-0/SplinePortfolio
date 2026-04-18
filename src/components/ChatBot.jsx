import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_RESPONSE = `Hi there! I'm Harini's AI sidekick! 🦸‍♀️ I can answer questions about her professional background, experience at Wells Fargo, projects like Codon: Prodgard or the Release Version Tool, her MS at Northeastern, and her skills in distributed systems, AI tooling, and full-stack development. The full RAG-powered backend is coming soon — ask me anything!`;

const SUGGESTED = [
  'Tell me about Codon: Prodgard',
  'What did you build at Wells Fargo?',
  'What is your MS focused on?',
  'Walk me through the Release Version Tool',
];

async function getResponse(question) {
  const apiUrl = import.meta.env.VITE_CHAT_API_URL;
  if (apiUrl) {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    return data.answer;
  }
  await new Promise(r => setTimeout(r, 1500));
  return MOCK_RESPONSE;
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hey! I'm Harini's AI. Ask me anything about her background, projects, or experience — or pick a suggestion below! 💬`,
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text) {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput('');
    setLoading(true);
    setMessages(m => [...m, { role: 'user', content: question }]);
    try {
      const answer = await getResponse(question);
      setMessages(m => [...m, { role: 'assistant', content: answer }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'ZAP! Something went wrong — please try again.' }]);
    }
    setLoading(false);
  }

  return (
    <section id="chat" className="relative py-24 px-6 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 scene-chat" />
      <div className="pointer-events-none absolute inset-0 halftone-blue opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-5">
          <div className="panel-number">💬</div>
          <div>
            <h2 className="font-comic text-5xl text-comic-orange tracking-comic"
                style={{ textShadow: '3px 3px 0 #000' }}>
              CHAT WITH ME
            </h2>
            <p className="section-subheading mt-1">
              Ask anything about my background — hirers welcome.
            </p>
          </div>
        </motion.div>

        {/* Comic chat panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: '#0d0600',
            border: '4px solid #ff6500',
            boxShadow: '8px 8px 0 #ff6500',
            borderRadius: 4,
          }}>

          {/* Chat header bar */}
          <div className="px-5 py-3 flex items-center gap-3 border-b-2 border-comic-orange/40"
               style={{ background: 'rgba(255,101,0,0.1)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-comic-orange" />
              <div className="w-3 h-3 rounded-full bg-comic-yellow" />
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff6500aa' }} />
            </div>
            <span className="font-comic tracking-comic text-sm text-comic-orange ml-2">
              HARINI'S AI SIDEKICK — ACTIVE
            </span>
            <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>

          {/* Messages scroll area */}
          <div className="flex flex-col gap-8 p-6 h-[420px] overflow-y-auto
                          scrollbar-thin scrollbar-thumb-comic-orange/30">

            {messages.map((m, i) => (
              <div key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                {/* Avatar */}
                {m.role === 'assistant' && (
                  <div className="shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center font-comic text-sm"
                         style={{ background: '#ff6500', border: '2px solid #000',
                                  boxShadow: '2px 2px 0 #000', borderRadius: 2, color: '#000' }}>
                      AI
                    </div>
                  </div>
                )}

                {/* Message bubble */}
                <div className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed
                  ${m.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                  {m.content}
                </div>

                {/* User avatar */}
                {m.role === 'user' && (
                  <div className="shrink-0 ml-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center font-comic text-sm"
                         style={{ background: '#ffd600', border: '2px solid #000',
                                  boxShadow: '2px 2px 0 #000', borderRadius: 2, color: '#000' }}>
                      YOU
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Loading bubble */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start">
                  <div className="shrink-0 mr-3 mt-1">
                    <div className="w-8 h-8 flex items-center justify-center font-comic text-sm"
                         style={{ background: '#ff6500', border: '2px solid #000',
                                  boxShadow: '2px 2px 0 #000', borderRadius: 2, color: '#000' }}>
                      AI
                    </div>
                  </div>
                  <div className="bubble-loading px-5 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map(j => (
                      <motion.div key={j}
                        className="w-2.5 h-2.5 rounded-full bg-comic-orange"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.14 }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4 flex flex-wrap gap-2 border-t-2 border-dashed
                            border-comic-orange/20 pt-4">
              <span className="font-comic text-xs text-comic-orange/50 tracking-comic w-full mb-1">
                TRY ASKING:
              </span>
              {SUGGESTED.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-xs font-semibold uppercase tracking-wide px-3 py-1.5
                             transition-all duration-150 hover:-translate-y-0.5"
                  style={{ border: '2px solid rgba(255,101,0,0.5)', color: '#ff6500',
                           borderRadius: 2, background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ff6500'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff6500'; }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div className="p-4 border-t-2 border-comic-orange/40 flex gap-3">
            <input
              className="field-comic flex-1 text-sm"
              placeholder="Type your question, hero..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={loading} />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="btn-comic px-5 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontSize: 14 }}>
              SEND ⚡
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
