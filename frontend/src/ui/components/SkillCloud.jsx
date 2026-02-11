import React from 'react';
import { motion } from 'framer-motion';

export default function SkillCloud({ title, items }){
  return (
    <motion.div
      className="card"
      style={{ padding: 16 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45 }}
    >
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 10 }}>
        <div style={{ fontWeight: 650 }}>{title}</div>
        <span className="kbd">{items.length}</span>
      </div>
      <div className="tags" style={{ marginTop: 12 }}>
        {items.map((s) => <span className="tag" key={s}>{s}</span>)}
      </div>
    </motion.div>
  );
}
