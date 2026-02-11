import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { sendContact } from '../lib/api.js';

export default function ContactForm(){
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const disabled = useMemo(() => status.state === 'sending', [status.state]);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });

    try{
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      };
      if(payload.name.length < 2) throw new Error('Nom trop court.');
      if(!payload.email.includes('@')) throw new Error('Email invalide.');
      if(payload.message.length < 10) throw new Error('Message trop court (min 10 caractères).');

      await sendContact(payload);
      setStatus({ state: 'ok', message: 'Message envoyé. Je te réponds dès que possible.' });
      setForm({ name: '', email: '', message: '' });
    }catch(err){
      setStatus({ state: 'err', message: err.message || 'Erreur.' });
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="card"
      style={{ padding: 16 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="row">
        <div>
          <label className="small">Nom</label>
          <input className="input" name="name" value={form.name} onChange={onChange} placeholder="Ton nom" disabled={disabled}/>
        </div>
        <div>
          <label className="small">Email</label>
          <input className="input" name="email" value={form.email} onChange={onChange} placeholder="ton@email.com" disabled={disabled}/>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <label className="small">Message</label>
        <textarea className="textarea" name="message" value={form.message} onChange={onChange} placeholder="Explique ton besoin / ta proposition…" disabled={disabled}/>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap: 10, marginTop: 12, flexWrap:'wrap' }}>
        <button className="btn primary" type="submit" disabled={disabled}>
          {status.state === 'sending' ? 'Envoi…' : 'Envoyer'}
        </button>
        {status.state !== 'idle' && (
          <span className="small" style={{ color: status.state === 'ok' ? 'var(--text)' : 'var(--muted)' }}>
            {status.message}
          </span>
        )}
      </div>

      <div className="small" style={{ marginTop: 10 }}>
        Astuce: en prod, branche un vrai service d’email et ajoute un rate-limit sur l’API.
      </div>
    </motion.form>
  );
}
