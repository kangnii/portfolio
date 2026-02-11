import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle }){
  return (
    <div style={{ marginBottom: 18 }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.45 }}
      >
        <div className="pill" style={{ marginBottom: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }} />
          {subtitle || 'Section'}
        </div>
        <h2 className="h2">{title}</h2>
      </motion.div>
    </div>
  );
}
