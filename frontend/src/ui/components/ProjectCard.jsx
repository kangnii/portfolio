import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ p }){
  return (
    <motion.article
      className="card"
      style={{ padding: 16, overflow: 'hidden', position:'relative' }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      <div style={{
        position:'absolute', inset: -2, opacity: 0.35,
        background: 'radial-gradient(500px 200px at 30% 0%, rgba(217,70,239,0.25), transparent 70%), radial-gradient(400px 260px at 80% 10%, rgba(34,211,238,0.18), transparent 60%)'
      }} />
      <div style={{ position:'relative' }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap: 12 }}>
          <h3 style={{ margin: 0, fontSize: 18, letterSpacing: '-0.01em' }}>{p.name}</h3>
        </div>
        <p className="p" style={{ marginTop: 10 }}>{p.description}</p>

        <div className="tags" style={{ marginTop: 12 }}>
          {(p.tags || []).map(t => <span className="tag" key={t}>{t}</span>)}
        </div>

        {!!(p.highlights?.length) && (
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.6 }}>
            {p.highlights.slice(0,3).map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
