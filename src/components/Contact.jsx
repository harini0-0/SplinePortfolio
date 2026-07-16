import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/resume';
import AmbientParticles from './AmbientParticles';

const BG = '#040D12'; const CARD = 'rgba(8,22,30,0.82)'; const TEAL = '#4F9B93';
const TEXT = '#E0EDF4'; const DIM = 'rgba(224,237,244,0.52)'; const FAINT = 'rgba(224,237,244,0.28)';

const card = { background:CARD, borderRadius:14, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.04),0 20px 48px rgba(0,0,0,0.5)' };
const fadeUp = (d=0) => ({ initial:{opacity:0,y:24}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:0.5,delay:d,ease:[0.22,1,0.36,1]} });

const links = [
  { label:'Email',    value:profile.email,                              href:`mailto:${profile.email}`, icon:'EM', external:false },
  { label:'LinkedIn', value:'linkedin.com/in/harini-thirunavukkarasan', href:profile.linkedin,          icon:'LI', external:true  },
  { label:'GitHub',   value:'github.com/harini0-0',                    href:profile.github,            icon:'GH', external:true  },
];

function validate(f) {
  const e={};
  if(!f.name.trim())    e.name='Name is required';
  if(!f.email.trim())   e.email='Email is required';
  else if(!/\S+@\S+\.\S+/.test(f.email)) e.email='Enter a valid email';
  if(!f.subject.trim()) e.subject='Subject is required';
  if(!f.message.trim()) e.message='Message is required';
  return e;
}

function ContactLink({ c }) {
  const [h, setH] = useState(false);
  return (
    <a href={c.href} target={c.external?'_blank':undefined} rel="noreferrer"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:'block', textDecoration:'none', borderRadius:14, padding:'16px 20px', transition:'all 0.15s',
        background: CARD, boxShadow: h ? 'inset 0 1px 0 rgba(255,255,255,0.06),0 16px 40px rgba(0,0,0,0.55)' : 'inset 0 1px 0 rgba(255,255,255,0.04),0 8px 24px rgba(0,0,0,0.4)',
        transform: h ? 'translateY(-2px)' : 'none',
      }}>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <div style={{ width:38,height:38,flexShrink:0,background:'rgba(79,155,147,0.1)',border:'1px solid rgba(79,155,147,0.2)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:TEAL }}>{c.icon}</div>
        <div style={{flex:1}}>
          <p style={{fontSize:10,color:FAINT,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:3}}>{c.label}</p>
          <p style={{fontSize:13,color:h?TEAL:DIM,transition:'color 0.15s'}}>{c.value}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={h?TEAL:'rgba(224,237,244,0.2)'} strokeWidth="2" style={{transition:'stroke 0.15s',flexShrink:0}}>
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  );
}

function FormField({ name, placeholder, value, onChange, error, multiline }) {
  const [focused, setFocused] = useState(false);
  const base = { width:'100%',background:'rgba(255,255,255,0.04)',border:focused?'1px solid rgba(79,155,147,0.4)':error?'1px solid rgba(239,68,68,0.5)':'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'12px 16px',fontSize:14,color:TEXT,outline:'none',fontFamily:"'Space Grotesk',sans-serif",transition:'border-color 0.15s',boxSizing:'border-box' };
  return (
    <div>
      {multiline
        ? <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={4}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
            style={{...base,resize:'none'}} />
        : <input name={name} value={value} onChange={onChange} placeholder={placeholder}
            onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
            style={base} />
      }
      {error && <p style={{fontSize:12,color:'rgba(239,68,68,0.8)',marginTop:4}}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form,setForm]   = useState({name:'',email:'',subject:'',message:''});
  const [errors,setErrors] = useState({});
  const [sent,setSent]   = useState(false);
  const [loading,setLoading] = useState(false);

  function handleChange(e) {
    setForm(f=>({...f,[e.target.name]:e.target.value}));
    setErrors(er=>({...er,[e.target.name]:undefined}));
  }

  async function handleSubmit() {
    const errs=validate(form); if(Object.keys(errs).length){setErrors(errs);return;}
    setLoading(true); await new Promise(r=>setTimeout(r,1200)); setLoading(false); setSent(true);
  }

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden" style={{background:BG}}>
      <AmbientParticles />
      <div className="relative z-10 max-w-6xl mx-auto">

        <motion.div {...fadeUp(0)} style={{marginBottom:56}}>
          <p style={{fontSize:11,fontWeight:500,color:TEAL,textTransform:'uppercase',letterSpacing:'0.14em',marginBottom:10}}>06 / Contact</p>
          <h2 style={{fontWeight:700,fontSize:'clamp(2.2rem,5vw,3.8rem)',color:TEXT,letterSpacing:'-0.03em',lineHeight:1}}>Get in touch</h2>
          <p style={{fontSize:15,color:DIM,marginTop:10}}>Recruiters, collaborators, or the curious — inbox is open.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Left */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
            {links.map(c=><ContactLink key={c.label} c={c} />)}
            <div style={{...card,padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
              <span className="animate-pulse" style={{width:8,height:8,borderRadius:'50%',background:'#4ade80',flexShrink:0}} />
              <div>
                <p style={{fontSize:11,color:TEAL,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:3}}>Currently available</p>
                <p style={{fontSize:13,color:DIM}}>{profile.availability}</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div {...fadeUp(0.2)}>
            {sent ? (
              <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
                style={{...card,padding:'40px 32px',display:'flex',flexDirection:'column',alignItems:'center',gap:16,textAlign:'center',minHeight:300,justifyContent:'center'}}>
                <div style={{width:48,height:48,borderRadius:'50%',border:`2px solid ${TEAL}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h3 style={{fontWeight:700,fontSize:'1.5rem',color:TEXT,letterSpacing:'-0.01em'}}>Message sent!</h3>
                <p style={{fontSize:14,color:DIM}}>I'll get back to you soon. Thanks for reaching out.</p>
                <button onClick={()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''});}}
                  style={{fontSize:13,color:TEAL,background:'none',border:'none',cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",fontWeight:500,textDecoration:'underline'}}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <div style={{...card,padding:'24px'}}>
                <div className="flex flex-col gap-3">
                  {[{name:'name',placeholder:'Your name'},{name:'email',placeholder:'Email address'},{name:'subject',placeholder:'Subject'}].map(f=>(
                    <FormField key={f.name} {...f} value={form[f.name]} onChange={handleChange} error={errors[f.name]} />
                  ))}
                  <FormField name="message" placeholder="Your message..." value={form.message} onChange={handleChange} error={errors.message} multiline />
                  <button onClick={handleSubmit} disabled={loading}
                    style={{width:'100%',background:TEAL,color:'#040D12',fontWeight:700,fontSize:14,padding:13,borderRadius:10,border:'none',cursor:'pointer',fontFamily:"'Space Grotesk',sans-serif",opacity:loading?0.6:1,transition:'opacity 0.15s',marginTop:4}}>
                    {loading?'Sending…':'Send message'}
                  </button>
                  <p style={{fontSize:11,textAlign:'center',color:FAINT}}>Backend (EmailJS) coming soon</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
