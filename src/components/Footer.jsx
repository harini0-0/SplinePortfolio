import { useState } from 'react';
import { profile } from '../data/resume';

const TEAL = '#4F9B93'; const DIM = 'rgba(224,237,244,0.35)'; const FAINT = 'rgba(224,237,244,0.18)';

const navLinks = [
  {label:'About',href:'#about'},{label:'Experience',href:'#experience'},
  {label:'Projects',href:'#projects'},{label:'Skills',href:'#stack'},
  {label:'Chat',href:'#chat'},{label:'Contact',href:'#contact'},
];

const socials = [
  {label:'GH',href:profile.github,external:true},
  {label:'LI',href:profile.linkedin,external:true},
  {label:'EM',href:`mailto:${profile.email}`,external:false},
];

function SocialBtn({ s }) {
  const [h, setH] = useState(false);
  return (
    <a href={s.href} target={s.external?'_blank':undefined} rel="noreferrer"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8,textDecoration:'none',transition:'all 0.15s',fontSize:11,fontWeight:600,
        border:h?'1px solid rgba(79,155,147,0.3)':'1px solid rgba(255,255,255,0.1)',
        color:h?TEAL:FAINT, background:h?'rgba(79,155,147,0.1)':'transparent',
      }}>{s.label}</a>
  );
}

function NavLink({ l }) {
  const [h, setH] = useState(false);
  return (
    <a href={l.href} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ fontSize:13,color:h?TEAL:DIM,textDecoration:'none',transition:'color 0.15s',fontWeight:500 }}>
      {l.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer style={{ background:'#040D12', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'40px 24px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex flex-col items-center sm:items-start gap-1">
            <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:'1.1rem', color:TEAL, letterSpacing:'-0.01em' }}>
              {profile.name}
            </span>
            <span style={{ fontSize:11, color:FAINT, fontFamily:"'Space Grotesk',sans-serif" }}>
              React · Spline · Claude API
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {navLinks.map(l => <NavLink key={l.label} l={l} />)}
          </div>

          <div className="flex items-center gap-2">
            {socials.map(s => <SocialBtn key={s.label} s={s} />)}
          </div>
        </div>

        <p style={{ textAlign:'center', fontSize:11, color:FAINT, marginTop:32, fontFamily:"'Space Grotesk',sans-serif" }}>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
