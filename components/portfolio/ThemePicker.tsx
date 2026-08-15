'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ThemeName } from '@/lib/themes';
import { useTheme } from './ThemeProvider';

const THEME_DOTS: { name: ThemeName; color: string; label: string }[] = [
  { name: 'dracula',    color: '#bd93f9', label: 'Dracula'    },
  { name: 'tokyo',      color: '#7aa2f7', label: 'Tokyo'      },
  { name: 'catppuccin', color: '#cba6f7', label: 'Catppuccin' },
  { name: 'nord',       color: '#88c0d0', label: 'Nord'       },
  { name: 'green',      color: '#50fa7b', label: 'Green'      },
  { name: 'amber',      color: '#ffb86c', label: 'Amber'      },
];

export default function ThemePicker() {
  const { theme, themeName, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Change theme"
        aria-label="Change theme"
        style={{
          background: 'none',
          border: `1px solid ${theme.border}`,
          borderRadius: 5,
          cursor: 'pointer',
          padding: '4px 10px',
          color: theme.primary,
          fontFamily: 'Courier New, monospace',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        🎨
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            backgroundColor: theme.bgBar,
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: 148,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            zIndex: 9999,
          }}
        >
          <div style={{ color: theme.dim, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'Courier New, monospace' }}>
            Theme
          </div>
          {THEME_DOTS.map(t => {
            const active = themeName === t.name;
            return (
              <button
                key={t.name}
                onClick={() => { setTheme(t.name); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: active ? `${t.color}22` : 'none',
                  border: active ? `1px solid ${t.color}` : '1px solid transparent',
                  borderRadius: 5,
                  cursor: 'pointer',
                  padding: '5px 8px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: 13,
                  color: theme.primary,
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: t.color, flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)', display: 'inline-block' }} />
                {t.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
