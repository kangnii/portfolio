import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import SectionTitle from './components/SectionTitle.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import SkillCloud from './components/SkillCloud.jsx';
import ContactForm from './components/ContactForm.jsx';
import { getProfile } from './lib/api.js';
import { useTheme } from './lib/useTheme.js';
import { useCursorGlow } from './lib/useCursorGlow.js';
import { useScrollProgress } from './lib/useScrollProgress.js';

const FadeIn = ({ children, delay=0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay }}
  >
    {children}
  </motion.div>
);

function scrollToId(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({ behavior:'smooth', block:'start' });
}

export default function App(){
  const { theme, toggle } = useTheme();
  useCursorGlow();
  const progress = useScrollProgress();

  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try{
        const p = await getProfile(ctrl.signal);
        setData(p);
      }catch(e){
        setErr('Impossible de charger l’API. Lance le backend Flask, ou vérifie VITE_API_BASE.');
      }finally{
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const skillsBlocks = useMemo(() => {
    const s = data?.skills || {};
    return Object.entries(s).map(([k, v]) => ({ title: k, items: v }));
  }, [data]);

  return (
    <>
      <div className="cursorGlow" />
      <motion.div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <AnimatedBackground />

      <header className="nav">
        <div className="container navInner">
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <div className="pill">
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />
              <strong style={{ color: 'var(--text)' }}>Wiz</strong>
              <span style={{ opacity: 0.6 }}>portfolio</span>
            </div>
          </div>

          <nav className="navLinks" aria-label="Navigation">
            <a href="#home" onClick={(e)=>{e.preventDefault();scrollToId('home')}}>Accueil</a>
            <a href="#about" onClick={(e)=>{e.preventDefault();scrollToId('about')}}>À propos</a>
            <a href="#skills" onClick={(e)=>{e.preventDefault();scrollToId('skills')}}>Compétences</a>
            <a href="#projects" onClick={(e)=>{e.preventDefault();scrollToId('projects')}}>Projets</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault();scrollToId('contact')}}>Contact</a>
          </nav>

          <button className="iconBtn" onClick={toggle} title="Basculer thème">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main id="home" className="section hero">
        <div className="container grid2">
          <div className="card heroCard">
            <FadeIn>
              <div className="pill">Disponible pour alternance / missions</div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="h1">
                {loading ? 'Chargement…' : (data?.headline || 'Systèmes • Réseaux • Cyber • Data')}
              </h1>
            </FadeIn>

            <FadeIn delay={0.10}>
              <p className="p">
                {loading ? 'Connexion à l’API…' : (data?.about?.[0] || '')}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="heroActions">
                <button className="btn primary" onClick={() => scrollToId('projects')}>Voir les projets</button>
                <button className="btn" onClick={() => scrollToId('contact')}>Me contacter</button>
                <a className="btn" href={data?.github || '#'} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </FadeIn>

            {!!err && (
              <div className="pill" style={{ borderColor: 'rgba(255,255,255,0.22)', background:'rgba(255,255,255,0.04)' }}>
                ⚠️ {err}
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 18, position:'relative', overflow:'hidden' }}>
            <div style={{
              position:'absolute', inset:-2, opacity: 0.6,
              background: 'radial-gradient(420px 220px at 30% 0%, rgba(34,211,238,0.20), transparent 70%), radial-gradient(520px 260px at 85% 10%, rgba(217,70,239,0.22), transparent 60%)'
            }} />
            <div style={{ position:'relative' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, letterSpacing:'-0.01em' }}>
                    {data?.name || 'Wisdom Follygan'}
                  </div>
                  <div className="small">{data?.location || ''}</div>
                </div>
                <div className="pill">React + Flask</div>
              </div>

              <div style={{ marginTop: 14, display:'grid', gap: 10 }}>
                <div className="card" style={{ padding: 14, background:'var(--panel2)' }}>
                  <div style={{ fontWeight: 650 }}>Focus</div>
                  <div className="small" style={{ marginTop: 6 }}>
                    Systèmes, réseaux & cybersécurité — avec un angle data (Python/SQL, visualisation).
                  </div>
                </div>

                <div className="card" style={{ padding: 14, background:'var(--panel2)' }}>
                  <div style={{ fontWeight: 650 }}>Contact rapide</div>
                  <div className="small" style={{ marginTop: 6, display:'grid', gap: 6 }}>
                    <div>📧 {data?.email || ''}</div>
                    <div>📱 {data?.phone || ''}</div>
                  </div>
                </div>
              </div>

              <div className="small" style={{ marginTop: 14 }}>
                Raccourcis: <span className="kbd">G</span> pour GitHub, <span className="kbd">C</span> pour Contact
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="about" className="section">
        <div className="container">
          <SectionTitle title="À propos" subtitle="Profil" />
          <div className="grid2">
            <div className="card" style={{ padding: 18 }}>
              <div style={{ display:'grid', gap: 10 }}>
                {(data?.about || []).map((t, i) => (
                  <motion.p
                    className="p"
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.42, delay: i * 0.05 }}
                  >
                    {t}
                  </motion.p>
                ))}
              </div>
              <div className="tags" style={{ marginTop: 14 }}>
                {(data?.languages || []).map(l => (
                  <span className="tag" key={l.name}>{l.name} — {l.level}</span>
                ))}
              </div>
            </div>

            <div style={{ display:'grid', gap: 14 }}>
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 750, marginBottom: 10 }}>Formation</div>
                <div style={{ display:'grid', gap: 12 }}>
                  {(data?.education || []).map((e, i) => (
                    <div key={i} className="card" style={{ padding: 14, background:'var(--panel2)' }}>
                      <div style={{ fontWeight: 650 }}>{e.school}</div>
                      <div className="small">{e.degree}</div>
                      <div className="small" style={{ marginTop: 4 }}>{e.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontWeight: 750, marginBottom: 10 }}>Centres d’intérêt</div>
                <div className="tags">
                  {(data?.interests || []).map(i => <span className="tag" key={i}>{i}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <SectionTitle title="Compétences" subtitle="Stack" />
          <div className="grid3">
            {skillsBlocks.map(b => <SkillCloud key={b.title} title={b.title} items={b.items} />)}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <SectionTitle title="Projets" subtitle="Réalisations" />
          <div className="grid3">
            {(data?.projects || []).map(p => <ProjectCard key={p.name} p={p} />)}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <SectionTitle title="Contact" subtitle="Écrire" />
          <div className="grid2">
            <ContactForm />
            <div style={{ display:'grid', gap: 14 }}>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 750 }}>Infos</div>
                <div className="small" style={{ marginTop: 10, display:'grid', gap: 8 }}>
                  <div>📍 {data?.location || ''}</div>
                  <div>📧 <a href={`mailto:${data?.email || ''}`}>{data?.email || ''}</a></div>
                  <div>📱 <a href={`tel:${(data?.phone || '').replace(/\s/g,'')}`}>{data?.phone || ''}</a></div>
                  <div>🔗 <a href={data?.github || '#'} target="_blank" rel="noreferrer">{data?.github || ''}</a></div>
                </div>
              </div>

              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 750 }}>Expérience</div>
                <div style={{ marginTop: 10, display:'grid', gap: 12 }}>
                  {(data?.experience || []).map((x, i) => (
                    <div key={i} className="card" style={{ padding: 14, background:'var(--panel2)' }}>
                      <div style={{ fontWeight: 650 }}>{x.title}</div>
                      <div className="small">{x.date}</div>
                      <ul style={{ margin: '10px 0 0', paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.6 }}>
                        {(x.bullets || []).map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 750 }}>Touches dynamiques</div>
                <div className="small" style={{ marginTop: 10, lineHeight: 1.6 }}>
                  Canvas animé + glow curseur + animations au scroll.  
                  On garde ça léger, sans framework CSS.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12, flexWrap:'wrap' }}>
          <div className="small">© {new Date().getFullYear()} {data?.name || 'Wisdom Follygan'} — Portfolio</div>
          <div className="small">Build: React (Vite) • API: Flask</div>
        </div>
      </footer>

      <KeyboardShortcuts github={data?.github} onContact={() => scrollToId('contact')} />
    </>
  );
}

function KeyboardShortcuts({ github, onContact }){
  useEffect(() => {
    const onKey = (e) => {
      if(e.target && ['INPUT','TEXTAREA'].includes(e.target.tagName)) return;
      if(e.key.toLowerCase() === 'g' && github) window.open(github, '_blank', 'noreferrer');
      if(e.key.toLowerCase() === 'c') onContact?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [github, onContact]);

  return null;
}
