import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AmbientParticles from './AmbientParticles';

const BG = '#040D12'; const TEAL = '#4F9B93'; const TEXT = '#E0EDF4';
const DIM = 'rgba(224,237,244,0.52)'; const FAINT = 'rgba(224,237,244,0.28)';

const MOCK = `Hi! I'm Harini's AI. I can answer questions about her professional background, experience at Wells Fargo, projects like Codon: Prodgard or the Release Version Tool, her MS at Northeastern, and her skills in distributed systems, AI tooling, and full-stack development. The full RAG-powered backend is coming soon — ask me anything!`;
const SUGGESTED = ['Tell me about Codon: Prodgard','What did you build at Wells Fargo?','What is your MS focused on?','Walk me through the Release Version Tool'];

async function getResponse(q) {
  // Same-origin relative path — works automatically once deployed on Vercel,
  // since the /api/chat function ships in the same deployment as this frontend.
  // Override with VITE_CHAT_API_URL only if the backend lives on a different domain.
  const url = import.meta.env.VITE_CHAT_API_URL || '/api/chat';
  if (import.meta.env.DEV && !import.meta.env.VITE_CHAT_API_URL) {
    await new Promise(r=>setTimeout(r,1500)); return MOCK;
  }
  const r = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q})});
  return (await r.json()).answer;
}

function Chip({ label, onClick }) {
  const [h, setH] = useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{ fontSize:12,fontWeight:500,padding:'6px 14px',borderRadius:20,background:'transparent',cursor:'pointer',transition:'all 0.15s',
      border: h?'1px solid rgba(79,155,147,0.4)':'1px solid rgba(255,255,255,0.08)',
      color: h?TEAL:DIM, fontFamily:"'Space Grotesk',sans-serif" }}>{label}</button>;
}

export default function ChatBot() {
  const [messages,setMessages] = useState([{role:'assistant',content:`Hey! I'm Harini's AI. Ask me anything about her background, projects, or experience — or pick a suggestion below.`}]);
  const [input,setInput] = useState(''); const [loading,setLoading] = useState(false); const [focused,setFocused] = useState(false);
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[messages,loading]);

  async function send(text) {
    const q=(text||input).trim(); if(!q||loading) return;
    setInput(''); setLoading(true); setMessages(m=>[...m,{role:'user',content:q}]);
    try { const a=await getResponse(q); setMessages(m=>[...m,{role:'assistant',content:a}]); }
    catch { setMessages(m=>[...m,{role:'assistant',content:'Something went wrong — please try again.'}]); }
    setLoading(false);
  }

  const aiAvatar = { width:30,height:30,flexShrink:0,background:'rgba(79,155,147,0.15)',border:'1px solid rgba(79,155,147,0.25)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:TEAL };
  const youAvatar= { width:30,height:30,flexShrink:0,background:'rgba(79,155,147,0.85)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#040D12' };

  return (
    <section id="chat" className="relative py-24 px-6 overflow-hidden" style={{background:BG}}>
      <AmbientParticles />
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} style={{marginBottom:40}}>
          <p style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:'uppercase',letterSpacing:'0.14em',marginBottom:10}}>05 / AI</p>
          <h2 style={{fontWeight:700,fontSize:'clamp(2.2rem,5vw,3.8rem)',color:TEXT,letterSpacing:'-0.03em',lineHeight:1}}>Chat with me</h2>
          <p style={{fontSize:15,color:DIM,marginTop:10}}>Ask anything about my background — hirers welcome.</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
          style={{background:'rgba(8,22,30,0.82)',borderRadius:20,overflow:'hidden',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04),0 24px 56px rgba(0,0,0,0.55)'}}>

          <div style={{padding:'14px 20px',display:'flex',alignItems:'center',gap:10,background:'rgba(79,155,147,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
            <span className="animate-pulse" style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',display:'inline-block'}} />
            <span style={{fontSize:13,color:DIM,fontWeight:500}}>Harini's AI — Active</span>
          </div>

          <div style={{height:400,overflowY:'auto',padding:'20px',display:'flex',flexDirection:'column',gap:16}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-end',gap:10,justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                {m.role==='assistant' && <div style={aiAvatar}>AI</div>}
                <div style={{maxWidth:'75%',padding:'11px 15px',fontSize:14,lineHeight:1.6,color:TEXT,
                  ...(m.role==='user'
                    ?{background:'rgba(79,155,147,0.14)',border:'1px solid rgba(79,155,147,0.2)',borderRadius:'16px 4px 16px 16px'}
                    :{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'4px 16px 16px 16px'})
                }}>{m.content}</div>
                {m.role==='user' && <div style={youAvatar}>YOU</div>}
              </div>
            ))}
            <AnimatePresence>
              {loading && (
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} style={{display:'flex',alignItems:'flex-end',gap:10}}>
                  <div style={aiAvatar}>AI</div>
                  <div style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'4px 16px 16px 16px',padding:'14px 18px',display:'flex',gap:5}}>
                    {[0,1,2].map(j=><motion.div key={j} style={{width:6,height:6,borderRadius:'50%',background:TEAL,opacity:0.6}} animate={{y:[0,-5,0]}} transition={{duration:0.5,repeat:Infinity,delay:j*0.14}} />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {messages.length<=1 && (
            <div style={{padding:'12px 20px 14px',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
              <p style={{fontSize:10,color:FAINT,marginBottom:10,textTransform:'uppercase',letterSpacing:'0.1em'}}>Try asking</p>
              <div className="flex flex-wrap gap-2">{SUGGESTED.map(q=><Chip key={q} label={q} onClick={()=>send(q)} />)}</div>
            </div>
          )}

          <div style={{padding:'14px 16px',display:'flex',gap:10,borderTop:'1px solid rgba(255,255,255,0.05)'}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} disabled={loading} placeholder="Ask me anything..."
              style={{flex:1,background:'rgba(255,255,255,0.04)',border:focused?'1px solid rgba(79,155,147,0.4)':'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'10px 16px',fontSize:14,color:TEXT,outline:'none',fontFamily:"'Space Grotesk',sans-serif",transition:'border-color 0.15s'}} />
            <button onClick={()=>send()} disabled={loading||!input.trim()}
              style={{background:TEAL,color:'#040D12',fontWeight:700,fontSize:13,padding:'10px 20px',borderRadius:10,border:'none',cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",opacity:(loading||!input.trim())?0.4:1,transition:'opacity 0.15s'}}>
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
