'use client';

import { useEffect, useState } from 'react';

const FIELDS: { key: string; label: string; placeholder?: string; multiline?: boolean; toggle?: boolean }[] = [
  { key: 'name',            label: 'Full Name',                  placeholder: 'Ritinder Singh' },
  { key: 'tagline',         label: 'Tagline',                    placeholder: 'Backend Dev · Flutter · Python' },
  { key: 'bio',             label: 'Bio',                        placeholder: 'A short paragraph about yourself...', multiline: true },
  { key: 'avatar',          label: 'Avatar (initials or image URL)', placeholder: 'RS' },
  { key: 'email',           label: 'Email',                      placeholder: 'you@example.com' },
  { key: 'github',          label: 'GitHub URL',                 placeholder: 'https://github.com/yourusername' },
  { key: 'linkedin',        label: 'LinkedIn URL',               placeholder: 'https://linkedin.com/in/yourprofile' },
  { key: 'twitter',         label: 'Twitter URL',                placeholder: 'https://twitter.com/yourhandle' },
  { key: 'resumeUrl',       label: 'Resume PDF URL',             placeholder: 'https://cdn.example.com/resume.pdf' },
  { key: 'location',        label: 'Location',                   placeholder: 'New Delhi, India' },
  { key: 'availableForWork', label: 'Available for Work?',        toggle: true },
  { key: 'statsProjects',   label: 'About Stats — Projects',     placeholder: '6+' },
  { key: 'statsExperience', label: 'About Stats — Experience',   placeholder: '3+ yrs' },
];

const S = {
  h1:     { color: '#bd93f9', fontSize: 22, marginBottom: 24 } as React.CSSProperties,
  label:  { display: 'block', color: '#888', fontSize: 12, marginBottom: 4, marginTop: 16 } as React.CSSProperties,
  input:  {
    width: '100%', background: '#0d0d0d', border: '1px solid #333', borderRadius: 4,
    color: '#cdd6f4', padding: '7px 10px', fontFamily: 'Courier New, monospace',
    fontSize: 13, boxSizing: 'border-box' as const,
  },
  saveBtn: {
    padding: '9px 24px', background: '#bd93f9', border: 'none', color: '#0a0a0a',
    borderRadius: 4, fontFamily: 'Courier New, monospace', fontSize: 13,
    fontWeight: 'bold' as const, cursor: 'pointer', marginTop: 28,
  },
  saved:  { color: '#50fa7b', fontSize: 12, marginTop: 12 } as React.CSSProperties,
};

export default function AdminConfig() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/config').then(r => r.json()).then(setConfig);
  }, []);

  const set = (key: string, value: string) => setConfig(c => ({ ...c, [key]: value }));

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={S.h1}>Site Config</h1>

      {FIELDS.map(f => (
        <div key={f.key}>
          <label style={S.label}>{f.label}</label>
          {f.toggle ? (
            <div
              onClick={() => set(f.key, config[f.key] === 'false' ? 'true' : 'false')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <div style={{
                width: 40, height: 22, borderRadius: 11,
                backgroundColor: config[f.key] !== 'false' ? '#50fa7b' : '#333',
                position: 'relative', transition: 'background-color 0.2s', flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', top: 3, borderRadius: '50%',
                  width: 16, height: 16, backgroundColor: '#fff',
                  left: config[f.key] !== 'false' ? 21 : 3,
                  transition: 'left 0.2s',
                }} />
              </div>
              <span style={{ color: config[f.key] !== 'false' ? '#50fa7b' : '#555', fontSize: 13, fontFamily: 'Courier New, monospace' }}>
                {config[f.key] !== 'false' ? 'Available' : 'Not available'}
              </span>
            </div>
          ) : f.multiline ? (
            <textarea
              style={{ ...S.input, minHeight: 100, resize: 'vertical' }}
              value={config[f.key] ?? ''}
              onChange={e => set(f.key, e.target.value)}
              placeholder={f.placeholder}
            />
          ) : (
            <input
              style={S.input}
              value={config[f.key] ?? ''}
              onChange={e => set(f.key, e.target.value)}
              placeholder={f.placeholder}
            />
          )}
        </div>
      ))}

      <button style={S.saveBtn} onClick={save} disabled={saving}>
        {saving ? 'Saving...' : 'Save Config'}
      </button>
      {saved && <div style={S.saved}>✓ Saved successfully</div>}
    </div>
  );
}
