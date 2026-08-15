'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useTerminal } from '@/components/terminal/useTerminal';
import TerminalOutput from '@/components/terminal/TerminalOutput';
import TerminalInput from '@/components/terminal/TerminalInput';
import MatrixRain from '@/components/terminal/MatrixRain';
import SnakeGame from '@/components/terminal/SnakeGame';

interface FloatingTerminalProps {
  open: boolean;
  onToggle: () => void;
}

export default function FloatingTerminal({ open, onToggle }: FloatingTerminalProps) {
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    lines,
    input,
    setInput,
    currentDir,
    matrixActive,
    setMatrixActive,
    snakeActive,
    setSnakeActive,
    executeCommand,
    handleKeyDown,
  } = useTerminal(undefined, { onSetTheme: setTheme });

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onToggle();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onToggle]);

  return (
    <>
      {/* Full-screen terminal overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
          backgroundColor: theme.bg,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Courier New, monospace',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          opacity: open ? 1 : 0,
          transition: 'transform 0.28s ease, opacity 0.28s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* ── Top bar: title only ────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            height: 44,
            backgroundColor: theme.bgBar,
            borderBottom: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}
        >
          <span style={{ color: theme.dim, fontSize: 13 }}>
            <span style={{ color: theme.secondary }}>ritinder</span>
            {'@portfolio:'}
            <span style={{ color: theme.secondary }}>{currentDir}</span>
          </span>
        </div>

        {/* ── Single scrollable body: output then prompt ───── */}
        <div
          style={{ flex: 1, overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}
          onClick={() => inputRef.current?.focus()}
        >
          {matrixActive && (
            <MatrixRain
              theme={theme}
              onExit={() => { setMatrixActive(false); setTimeout(() => inputRef.current?.focus(), 100); }}
            />
          )}
          {snakeActive && (
            <SnakeGame
              theme={theme}
              onExit={(score: number) => {
                setSnakeActive(false);
                executeCommand(`echo "Snake game over! Final score: ${score}"`);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
            />
          )}
          {/* Output — natural height, no flex:1, scrolled by parent */}
          <TerminalOutput
            lines={lines}
            theme={theme}
            containerStyle={{ flex: 'none', overflowY: 'visible' }}
          />
          {/* Prompt sits immediately after the last output line */}
          <TerminalInput
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            theme={theme}
            currentDir={currentDir}
            inputRef={inputRef}
          />
        </div>

        {/* ── Bottom bar: hints + portfolio button ──────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            height: 44,
            backgroundColor: theme.bgBar,
            borderTop: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}
        >
          <span style={{ color: theme.dim, fontSize: 11, display: 'flex', gap: 16 }}>
            <span><span style={{ color: theme.secondary }}>tab</span> complete</span>
            <span><span style={{ color: theme.secondary }}>↑↓</span> history</span>
            <span><span style={{ color: theme.secondary }}>ESC</span> exit</span>
          </span>

          <button
            onClick={onToggle}
            style={{
              background: 'none',
              border: `1px solid ${theme.border}`,
              borderRadius: 6,
              color: theme.primary,
              cursor: 'pointer',
              fontFamily: 'Courier New, monospace',
              fontSize: 13,
              padding: '5px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = theme.primary;
              e.currentTarget.style.color = theme.secondary;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.color = theme.primary;
            }}
          >
            <span style={{ fontSize: 11 }}>◀</span>
            portfolio
          </button>
        </div>
      </div>

      {/* Portfolio-mode entry button */}
      <button
        onClick={onToggle}
        aria-label="Open terminal"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 200,
          backgroundColor: theme.bgBar,
          color: theme.primary,
          border: `1px solid ${theme.border}`,
          borderRadius: 7,
          padding: '8px 16px',
          cursor: 'pointer',
          fontFamily: 'Courier New, monospace',
          fontSize: 13,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : 'auto',
          transition: 'opacity 0.2s, border-color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = theme.primary)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = theme.border)}
      >
        <span style={{ fontWeight: 900, letterSpacing: '-1px' }}>{'>'}_</span>
        terminal
      </button>
    </>
  );
}
