'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from './ThemeProvider';

interface SiteConfig {
  name?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

function SectionLabel({ children, color, dim }: { children: React.ReactNode; color: string; dim: string }) {
  return (
    <div style={{ color: dim, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 32, fontFamily: 'Courier New, monospace', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ color, fontSize: 13 }}>#</span>
      {children}
      <span style={{ flex: 1, height: 1, backgroundColor: dim, opacity: 0.2, marginLeft: 8 }} />
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  theme: ReturnType<typeof useTheme>['theme'];
}

function ContactModal({ open, onClose, theme }: ModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const nameRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    setStatus('idle');
    setName('');
    setEmail('');
    setMessage('');
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => nameRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: theme.bg,
    border: `1px solid ${theme.border}`,
    borderRadius: 6,
    color: theme.primary,
    fontFamily: 'Courier New, monospace',
    fontSize: 13,
    padding: '8px 12px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        style={{
          backgroundColor: theme.bgBar,
          border: `1px solid ${theme.border}`,
          borderRadius: 10,
          width: '100%',
          maxWidth: 480,
          fontFamily: 'Courier New, monospace',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.bgDark,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={handleClose} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57', border: 'none', cursor: 'pointer', padding: 0 }} aria-label="Close" />
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: `${theme.border}`, display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: `${theme.border}`, display: 'inline-block' }} />
          </div>
          <span style={{ color: theme.dim, fontSize: 12 }}>send message</span>
          <span style={{ width: 60 }} />
        </div>

        <div style={{ padding: 24 }}>
          {status === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ color: '#a6e3a1', fontSize: 28, marginBottom: 12 }}>✓</div>
              <div style={{ color: theme.primary, fontSize: 14, marginBottom: 6 }}>Message sent!</div>
              <div style={{ color: theme.dim, fontSize: 12, marginBottom: 24 }}>I&apos;ll get back to you soon.</div>
              <button
                onClick={handleClose}
                style={{ backgroundColor: `${theme.primary}22`, border: `1px solid ${theme.primary}`, color: theme.primary, padding: '8px 20px', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}
              >
                close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', color: theme.dim, fontSize: 11, marginBottom: 5, letterSpacing: '0.08em' }}>NAME</label>
                <input
                  ref={nameRef}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="your name"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = theme.primary; }}
                  onBlur={e => { e.currentTarget.style.borderColor = theme.border; }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: theme.dim, fontSize: 11, marginBottom: 5, letterSpacing: '0.08em' }}>EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = theme.primary; }}
                  onBlur={e => { e.currentTarget.style.borderColor = theme.border; }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: theme.dim, fontSize: 11, marginBottom: 5, letterSpacing: '0.08em' }}>MESSAGE</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="what's on your mind?"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                  onFocus={e => { e.currentTarget.style.borderColor = theme.primary; }}
                  onBlur={e => { e.currentTarget.style.borderColor = theme.border; }}
                />
              </div>

              {status === 'error' && (
                <div style={{ color: '#f38ba8', fontSize: 12 }}>✗ Failed to send — please try again or email me directly.</div>
              )}

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{ backgroundColor: 'transparent', border: `1px solid ${theme.border}`, color: theme.dim, padding: '8px 18px', borderRadius: 6, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}
                >
                  cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    backgroundColor: `${theme.primary}22`,
                    border: `1px solid ${theme.primary}`,
                    color: theme.primary,
                    padding: '8px 20px',
                    borderRadius: 6,
                    fontFamily: 'inherit',
                    fontSize: 13,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                >
                  {status === 'sending' ? 'sending...' : 'send →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { theme } = useTheme();
  const [cfg, setCfg] = useState<SiteConfig>({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/content/config')
      .then(r => r.json())
      .then((data: SiteConfig) => setCfg(data))
      .catch(() => {});
  }, []);

  const resolveHref = (key: string, value: string) => {
    if (value.startsWith('http')) return value;
    return `https://${value}`;
  };

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.bgBar,
    border: `1px solid ${theme.border}`,
    color: theme.primary,
    padding: '10px 18px',
    borderRadius: 7,
    textDecoration: 'none',
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'Courier New, monospace',
    transition: 'border-color 0.15s, color 0.15s',
    background: theme.bgBar,
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: theme.bgDark,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel color={theme.primary} dim={theme.dim}>contact</SectionLabel>

        <p style={{ color: theme.dim, fontSize: 14, lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
          Open to interesting projects and conversations. Reach out via any of these.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {cfg.github && (
            <a
              href={resolveHref('github', cfg.github)}
              target="_blank"
              rel="noopener noreferrer"
              style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.secondary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.primary; }}
            >
              <GithubIcon /> GitHub
            </a>
          )}
          {cfg.linkedin && (
            <a
              href={resolveHref('linkedin', cfg.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              style={btnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.secondary; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.primary; }}
            >
              <LinkedInIcon /> LinkedIn
            </a>
          )}
          <button
            onClick={() => setModalOpen(true)}
            style={btnStyle}
            onMouseEnter={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.color = theme.secondary; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.primary; }}
          >
            <EmailIcon /> Email
          </button>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} theme={theme} />
    </section>
  );
}
