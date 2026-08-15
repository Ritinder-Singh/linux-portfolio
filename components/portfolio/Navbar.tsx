'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import ThemePicker from './ThemePicker';

const NAV_LINKS = [
  { label: 'about',    href: '#about'    },
  { label: 'projects', href: '#projects' },
  { label: 'skills',   href: '#skills'   },
  { label: 'contact',  href: '#contact'  },
];

export default function Navbar({ hidden = false }: { hidden?: boolean }) {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        .portfolio-nav-link {
          display: none;
        }
        @media (min-width: 640px) {
          .portfolio-nav-link { display: inline !important; }
        }
      `}</style>
      <nav
        style={{
          display: hidden ? 'none' : 'flex',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: 52,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          backgroundColor: scrolled ? `${theme.bgBar}ee` : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
          transition: 'background-color 0.25s, border-color 0.25s',
          fontFamily: 'Courier New, monospace',
        }}
      >
        <a
          href="#hero"
          style={{ textDecoration: 'none', fontSize: 14, fontWeight: 700, display: 'flex', gap: 0 }}
        >
          <span style={{ color: theme.secondary }}>ritinder</span>
          <span style={{ color: theme.dim }}>@portfolio</span>
          <span style={{ color: theme.secondary }}>:~$</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="portfolio-nav-link"
              style={{
                color: theme.dim,
                textDecoration: 'none',
                fontSize: 13,
                padding: '4px 10px',
                borderRadius: 4,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = theme.primary)}
              onMouseLeave={e => (e.currentTarget.style.color = theme.dim)}
            >
              ./{link.label}
            </a>
          ))}
          <div style={{ marginLeft: 8 }}>
            <ThemePicker />
          </div>
        </div>
      </nav>
    </>
  );
}
