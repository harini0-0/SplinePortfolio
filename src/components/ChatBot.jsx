import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const cardStyle = {
  background:     'rgba(18, 6, 30, 0.7)',
  border:         '1px solid rgba(255,255,255,0.07)',
  borderRadius:   20,
  backdropFilter: 'blur(8px)',
  boxShadow:      '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
};

const MOCK_RESPONSE = `Hi there! I'm Harini's AI. I can answer questions about her professional background, experience at Wells Fargo, projects like Codon: Prodgard or the Release Version Tool, her MS at Northeastern, and her skills in distributed systems, AI tooling, and full-stack development. The full RAG-powered backend is coming soon — ask me anything!`;

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
      content: `Hey! I'm Harini's AI. Ask me anything about her background, projects, or experience — or pick a suggestion below.`,
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
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
      setMessages(m => [...m, { role: 'assistant', content: 'Something went wrong — please try again.' }]);
    }
    setLoading(false);
  }

  return (
    <section
      id="chat"
      className="py-24 px-6"
      style={{ background: '#0C0016' }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#4F9B93',
            textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10,
          }}>
            05 / AI
          </p>
          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#E0EDF4', letterSpacing: '-0.03em', lineHeight: 1,
          }}>
            Chat with me
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(224,237,244,0.5)', marginTop: 10 }}>
            Ask anything about my background — hirers welcome.
          </p>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={cardStyle}
        >
          {/* Header bar */}
          <div style={{
            background: 'rgba(79,155,147,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderRadius: '20px 20px 0 0',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#4ade80', flexShrink: 0,
              boxShadow: '0 0 6px rgba(74,222,128,0.6)',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontSize: 13, color: 'rgba(224,237,244,0.5)', fontWeight: 500 }}>
              Harini's AI — Active
            </span>
          </div>

          {/* Messages area */}
          <div
            className="overflow-y-auto"
            style={{
              height: 400,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                {/* AI avatar (left) */}
                {m.role === 'assistant' && (
                  <div style={{
                    width: 30, height: 30, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(79,155,147,0.15)',
                    border: '1px solid rgba(79,155,147,0.25)',
                    borderRadius: 8,
                    color: '#4F9B93',
                    fontSize: 11,
                    fontWeight: 700,
                    marginTop: 2,
                  }}>
                    AI
                  </div>
                )}

                {/* Message bubble */}
                <div style={
                  m.role === 'assistant'
                    ? {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '4px 16px 16px 16px',
                        padding: '12px 16px',
                        fontSize: 14,
                        color: '#E0EDF4',
                        maxWidth: '75%',
                        lineHeight: 1.6,
                      }
                    : {
                        background: 'rgba(79,155,147,0.15)',
                        border: '1px solid rgba(79,155,147,0.2)',
                        borderRadius: '16px 4px 16px 16px',
                        padding: '12px 16px',
                        fontSize: 14,
                        color: '#E0EDF4',
                        maxWidth: '75%',
                        lineHeight: 1.6,
                      }
                }>
                  {m.content}
                </div>

                {/* User avatar (right) */}
                {m.role === 'user' && (
                  <div style={{
                    width: 30, height: 30, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(79,155,147,0.9)',
                    borderRadius: 8,
                    color: '#0C0016',
                    fontSize: 11,
                    fontWeight: 700,
                    marginTop: 2,
                  }}>
                    YOU
                  </div>
                )}
              </div>
            ))}

            {/* Loading dots */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
                >
                  <div style={{
                    width: 30, height: 30, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(79,155,147,0.15)',
                    border: '1px solid rgba(79,155,147,0.25)',
                    borderRadius: 8,
                    color: '#4F9B93',
                    fontSize: 11,
                    fontWeight: 700,
                    marginTop: 2,
                  }}>
                    AI
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '4px 16px 16px 16px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    {[0, 1, 2].map(j => (
                      <motion.div
                        key={j}
                        style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: '#4F9B93', opacity: 0.7,
                        }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.14 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div style={{
              padding: '0 20px 16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: 16,
            }}>
              <p style={{
                fontSize: 11,
                color: 'rgba(224,237,244,0.26)',
                marginBottom: 10,
              }}>
                Try asking:
              </p>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {SUGGESTED.map(q => (
                  <SuggestChip key={q} label={q} onClick={() => sendMessage(q)} />
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '14px 16px',
            display: 'flex',
            gap: 10,
            borderRadius: '0 0 20px 20px',
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              disabled={loading}
              placeholder="Type your question..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: inputFocused
                  ? '1px solid rgba(79,155,147,0.4)'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: '10px 16px',
                fontSize: 14,
                color: '#E0EDF4',
                outline: 'none',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'border-color 0.15s ease',
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                background: '#4F9B93',
                color: '#0C0016',
                fontWeight: 600,
                fontSize: 13,
                padding: '10px 20px',
                borderRadius: 10,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                border: 'none',
                opacity: loading || !input.trim() ? 0.4 : 1,
                transition: 'opacity 0.15s ease',
                fontFamily: "'Space Grotesk', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              Send
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function SuggestChip({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: hovered ? '1px solid rgba(79,155,147,0.4)' : '1px solid rgba(255,255,255,0.1)',
        color: hovered ? '#4F9B93' : 'rgba(224,237,244,0.5)',
        background: hovered ? 'rgba(79,155,147,0.08)' : 'transparent',
        borderRadius: 20,
        padding: '6px 14px',
        fontSize: 12,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {label}
    </button>
  );
}
