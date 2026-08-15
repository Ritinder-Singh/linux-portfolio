'use client';

import React from 'react';
import { Theme } from '@/lib/themes';

// Same high-contrast palette as TerminalOutput
const T = {
  cmd:    '#cba6f7',
  path:   '#a6e3a1',
  accent: '#89b4fa',
  muted:  '#585b70',
  white:  '#cdd6f4',
  caret:  '#cba6f7',
};

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  theme: Theme;
  currentDir: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function TerminalInput({
  value,
  onChange,
  onKeyDown,
  theme,
  currentDir,
  inputRef,
}: TerminalInputProps) {
  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
      <div
        style={{
          padding: '4px 16px 10px',
          backgroundColor: theme.bg,
          flexShrink: 0,
        }}
      >
        {/* Line 1 — P10k segments */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontSize: 12, fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace" }}>
          <span style={{ color: T.muted }}>╭─</span>

          <span style={{ backgroundColor: '#cba6f722', color: T.cmd, padding: '0 10px', fontWeight: 700 }}>
            ✦ ritinder
          </span>
          <span style={{ color: T.cmd }}>❯</span>

          <span style={{ backgroundColor: '#89b4fa22', color: T.accent, padding: '0 10px' }}>
            portfolio
          </span>
          <span style={{ color: T.accent }}>❯</span>

          <span style={{ backgroundColor: '#a6e3a122', color: T.path, padding: '0 10px' }}>
            {currentDir}
          </span>
        </div>

        {/* Line 2 — actual input */}
        <div style={{ display: 'flex', alignItems: 'center', fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace" }}>
          <span style={{ color: T.muted, fontSize: 12, marginRight: 4 }}>╰─</span>
          <span style={{ color: T.caret, fontSize: 15, marginRight: 8, fontWeight: 700 }}>❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: T.white,
              fontFamily: "'Fira Code','Cascadia Code','Courier New',monospace",
              fontSize: 13,
              width: '100%',
              caretColor: T.caret,
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}
