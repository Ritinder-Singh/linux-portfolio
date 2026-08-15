'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Skeleton } from '@/components/ui/Skeleton';

interface SiteConfig {
  name?: string;
  tagline?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  aboutStats?: string;
}

function SectionLabel({ children, color, dim }: { children: React.ReactNode; color: string; dim: string }) {
  return (
    <div style={{ color: dim, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 32, fontFamily: 'Courier New, monospace', display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ color, fontSize: 13 }}>#</span>
      {children}
      <span style={{ flex: 1, height: 1, backgroundColor: dim, opacity: 0.2, marginLeft: 8 }} />
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();
  const [cfg, setCfg] = useState<SiteConfig>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/content/config')
      .then(r => r.json())
      .then((data: SiteConfig) => { setCfg(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const stats = (() => { try { return JSON.parse(cfg.aboutStats ?? '{}'); } catch { return {}; } })();
  const isUrl = (cfg.avatar ?? '').startsWith('http');

  const neofetchRows: { key: string; value: string }[] = [
    cfg.tagline     ? { key: 'role',       value: cfg.tagline }           : null,
    cfg.location    ? { key: 'location',   value: cfg.location }          : null,
    stats.projects  ? { key: 'projects',   value: String(stats.projects) } : null,
    stats.experience ? { key: 'experience', value: String(stats.experience) } : null,
    cfg.github      ? { key: 'github',     value: cfg.github }            : null,
    cfg.linkedin    ? { key: 'linkedin',   value: cfg.linkedin }          : null,
  ].filter(Boolean) as { key: string; value: string }[];

  return (
    <section
      id="about"
      style={{
        backgroundColor: theme.bg,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel color={theme.primary} dim={theme.dim}>about</SectionLabel>

        {!loaded ? (
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <Skeleton width={100} height={100} radius={50} color={theme.primary} />
            <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1,2,3,4].map(i => <Skeleton key={i} height={14} color={theme.primary} />)}
            </div>
          </div>
        ) : (
          <div>
            {/* Neofetch-style layout */}
            <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 60px)', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 40 }}>
              {/* Avatar */}
              <div
                style={{
                  width: 100, height: 100, borderRadius: '50%',
                  border: `2px solid ${theme.primary}`,
                  backgroundColor: isUrl ? 'transparent' : theme.accent,
                  flexShrink: 0, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, color: '#fff',
                }}
              >
                {isUrl
                  ? <img src={cfg.avatar} alt={cfg.name ?? 'avatar'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : (cfg.avatar || 'R')}
              </div>

              {/* Neofetch info */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ color: theme.primary, fontWeight: 700, fontSize: 16, marginBottom: 2 }}>
                  {cfg.name ?? 'Ritinder Singh'}
                </div>
                <div style={{ color: theme.border, fontSize: 13, marginBottom: 14 }}>
                  {'─'.repeat(Math.max((cfg.name ?? 'Ritinder Singh').length + 14, 20))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {neofetchRows.map(row => (
                    <div key={row.key} style={{ display: 'flex', gap: 8, fontSize: 13, lineHeight: 1.5 }}>
                      <span style={{ color: theme.secondary, minWidth: 80 }}>{row.key}</span>
                      <span style={{ color: theme.dim }}>:</span>
                      {row.key === 'github' || row.key === 'linkedin' ? (
                        <a
                          href={row.value.startsWith('http') ? row.value : `https://${row.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: theme.primary, textDecoration: 'none', wordBreak: 'break-all' }}
                          onMouseEnter={e => (e.currentTarget.style.color = theme.secondary)}
                          onMouseLeave={e => (e.currentTarget.style.color = theme.primary)}
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span style={{ color: theme.primary }}>{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Color swatches */}
                <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                  {[theme.primary, theme.secondary, theme.accent, theme.dim, theme.border, theme.bgBar].map((c, i) => (
                    <span key={i} style={{ width: 18, height: 18, borderRadius: 3, backgroundColor: c, display: 'inline-block' }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            {cfg.bio && (
              <p style={{ color: theme.primary, fontSize: 14, lineHeight: 1.8, maxWidth: 700, margin: 0, opacity: 0.85 }}>
                {cfg.bio}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
