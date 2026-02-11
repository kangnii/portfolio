const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function getProfile(signal){
  const r = await fetch(`${API_BASE}/api/profile`, { signal });
  if(!r.ok) throw new Error('API /profile failed');
  return r.json();
}

export async function sendContact(payload){
  const r = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await r.json().catch(()=> ({}));
  if(!r.ok) throw new Error(data?.error || 'Contact failed');
  return data;
}
