'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface SiteConfig {
  github?: string;
  linkedin?: string;
}

const NAV = [
  { label: 'about',    href: '#about'    },
  { label: 'projects', href: '#projects' },
  { label: 'skills',   href: '#skills'   },
  { label: 'contact',  href: '#contact'  },
];

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  const { theme } = useTheme();
  const [cfg, setCfg] = useState<SiteConfig>({});
  const year = new Date().getFullYear();

  useEffect(() => {
    fetch('/api/content/config')
      .then(r => r.json())
      .then((data: SiteConfig) => setCfg(data))
      .catch(() => {});
  }, []);

  const social = [
    cfg.github   ? { label: 'GitHub',   href: cfg.github,   icon: <GithubIcon />   } : null,
    cfg.linkedin ? { label: 'LinkedIn', href: cfg.linkedin, icon: <LinkedInIcon /> } : null,
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  return (
    <footer
      style={{
        backgroundColor: theme.bgDark,
        borderTop: `1px solid ${theme.border}`,
        padding: '48px clamp(20px, 5vw, 80px) 32px',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <div style={{ color: theme.primary, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
              <span style={{ color: theme.secondary }}>ritinder</span>
              <span style={{ color: theme.dim }}>@portfolio</span>
              <span style={{ color: theme.secondary }}>:~$</span>
            </div>
            <div style={{ color: theme.dim, fontSize: 12, lineHeight: 1.7, maxWidth: 240 }}>
              Building things worth using.
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ color: theme.dim, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
              navigate
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{ color: theme.dim, textDecoration: 'none', fontSize: 13, transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = theme.primary)}
                  onMouseLeave={e => (e.currentTarget.style.color = theme.dim)}
                >
                  ./{link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social — from config */}
          {social.length > 0 && (
            <div>
              <div style={{ color: theme.dim, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
                connect
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {social.map(s => (
                  <a
                    key={s.label}
                    href={s.href.startsWith('http') ? s.href : `https://${s.href}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: theme.dim, textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = theme.primary)}
                    onMouseLeave={e => (e.currentTarget.style.color = theme.dim)}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            paddingTop: 24,
            borderTop: `1px solid ${theme.border}`,
            color: theme.dim,
            fontSize: 11,
          }}
        >
          <span>© {year} Ritinder Singh. All rights reserved.</span>
          <span style={{ color: theme.accent }}>
            built with Next.js · Prisma · PostgreSQL
          </span>
        </div>
      </div>
    </footer>
  );
}
