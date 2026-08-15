'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-cursor {
          animation: hero-blink 1s step-end infinite;
        }
      `}</style>
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          backgroundColor: theme.bgDark,
          fontFamily: 'Courier New, monospace',
        }}
      >
        <div
          style={{
            maxWidth: 680,
            width: '100%',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* Prompt line */}
          <div style={{ color: theme.dim, fontSize: 14, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 0 }}>
            <span style={{ color: theme.secondary }}>ritinder</span>
            <span>@portfolio</span>
            <span style={{ color: theme.secondary }}>:~$</span>
            <span
              className="hero-cursor"
              style={{
                display: 'inline-block',
                width: 9,
                height: '1em',
                backgroundColor: theme.cursor,
                marginLeft: 6,
                verticalAlign: 'text-bottom',
              }}
            />
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 8vw, 4.8rem)',
              fontWeight: 700,
              color: theme.primary,
              margin: '0 0 10px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Ritinder Singh
          </h1>

          {/* Role */}
          <div
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: theme.secondary,
              marginBottom: 20,
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            Full-Stack Engineer
          </div>

          {/* Tagline */}
          <p
            style={{
              color: theme.primary,
              fontSize: 'clamp(14px, 2vw, 16px)',
              marginBottom: 12,
              lineHeight: 1.75,
              maxWidth: 520,
              opacity: 0.75,
            }}
          >
            I turn ideas into working products — from database schema to deployed UI.
            Whether you need a co-founder to build alongside, an engineer to join your team,
            or someone to ship a side project fast, I'm that person.
          </p>

          {/* Status pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <span
              style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: '#27c93f',
                display: 'inline-block',
                boxShadow: '0 0 6px #27c93f',
              }}
            />
            <span style={{ color: theme.dim, fontSize: 12 }}>
              Available for new opportunities
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                backgroundColor: theme.primary,
                color: theme.bgDark,
                padding: '11px 22px',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'Courier New, monospace',
                display: 'inline-block',
              }}
            >
              See My Work
            </a>
            <a
              href="#about"
              style={{
                backgroundColor: 'transparent',
                color: theme.primary,
                border: `1px solid ${theme.border}`,
                padding: '11px 22px',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontFamily: 'Courier New, monospace',
                display: 'inline-block',
              }}
            >
              About Me
            </a>
            <a
              href="#contact"
              style={{
                backgroundColor: 'transparent',
                color: theme.dim,
                border: `1px solid ${theme.border}`,
                padding: '11px 22px',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontFamily: 'Courier New, monospace',
                display: 'inline-block',
              }}
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
