'use client';

import React, { useEffect, useRef } from 'react';
import { Theme } from '@/lib/themes';

export interface Line {
  type: 'output' | 'input' | 'error' | 'system';
  text: string;
  id?: string;
}

interface TerminalOutputProps {
  lines: Line[];
  theme: Theme;
  containerStyle?: React.CSSProperties;
}

// High-contrast terminal palette — always readable
const T = {
  cmd:     '#cba6f7', // bright purple  — command names
  desc:    '#a6adc8', // muted lavender — descriptions
  header:  '#89b4fa', // bright blue    — section headers
  divider: '#45475a', // subtle gray    — separator lines
  path:    '#a6e3a1', // green          — paths / dirs
  error:   '#f38ba8', // red            — errors
  warn:    '#f9e2af', // yellow         — warnings
  success: '#a6e3a1', // green          — success / system
  muted:   '#585b70', // very dim       — decorative chars
  white:   '#cdd6f4', // near-white     — default text
  accent:  '#fab387', // peach          — highlights
};

function linkify(text: string): React.ReactNode[] {
  const urlPattern = /(https?:\/\/[^\s]+|(?:www\.)?github\.com\/[^\s]+|(?:www\.)?linkedin\.com\/[^\s]+)/g;
  const parts = text.split(urlPattern);
  return parts.map((part, i) => {
    if (urlPattern.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`;
      return (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer"
          style={{ color: T.accent, textDecoration: 'underline', cursor: 'pointer' }}>
          {part}
        </a>
      );
    }
    return part;
  });
}

function renderInputLine(text: string): React.ReactNode {
  const match = text.match(/^(ritinder)(@portfolio)(:[^\$]+)(\$ )(.*)$/);
  if (match) {
    const [, user, host, path, dollar, cmd] = match;
    return (
      <>
        <span style={{ color: T.cmd, fontWeight: 700 }}>{user}</span>
        <span style={{ color: T.muted }}>{host}</span>
        <span style={{ color: T.path }}>{path}</span>
        <span style={{ color: T.muted }}>{dollar}</span>
        <span style={{ color: T.white }}>{cmd}</span>
      </>
    );
  }
  return <span style={{ color: T.muted }}>{text}</span>;
}

function renderOutputLine(text: string): React.ReactNode {
  const trimmed = text.trim();

  // Empty line
  if (trimmed === '') return <span>{text}</span>;

  // Divider lines ─────
  if (/^[─━\-]{3,}$/.test(trimmed)) {
    return <span style={{ color: T.divider }}>{text}</span>;
  }

  // Section headers — ALL CAPS words only
  if (/^[A-Z][A-Z\s]{2,}$/.test(trimmed)) {
    return (
      <span style={{ color: T.header, fontWeight: 700, letterSpacing: '0.1em', fontSize: 12 }}>
        {text}
      </span>
    );
  }

  // Box chars ┌ ┐ └ ┘ │ ─
  if (/[┌┐└┘│┬┴├┤┼]/.test(text)) {
    return <span style={{ color: T.muted }}>{text}</span>;
  }

  // "✦ ritinder@portfolio — welcome" style greeting header
  if (text.includes('✦') || text.includes('welcome')) {
    return <span style={{ color: T.cmd, fontWeight: 700 }}>{text}</span>;
  }

  // Command listing: "  cmdname    description text"
  // Matches lines like "  whoami    Display current user info"
  const cmdMatch = text.match(/^(\s*)([a-z][a-z0-9_-]*)(\s{2,})(.+)$/);
  if (cmdMatch) {
    const [, indent, cmd, spacing, desc] = cmdMatch;
    return (
      <>
        <span>{indent}</span>
        <span style={{ color: T.cmd, fontWeight: 700, display: 'inline-block', minWidth: 90 }}>{cmd}</span>
        <span style={{ color: T.muted }}>{spacing}</span>
        <span style={{ color: T.desc }}>{desc}</span>
      </>
    );
  }

  // Key: value lines (e.g. "Name:  Ritinder Singh")
  const kvMatch = text.match(/^(\s*)([A-Za-z][A-Za-z\s]*?)(\s*:\s*)(.+)$/);
  if (kvMatch) {
    const [, indent, key, sep, val] = kvMatch;
    return (
      <>
        {indent}
        <span style={{ color: T.header }}>{key}</span>
        <span style={{ color: T.muted }}>{sep}</span>
        <span style={{ color: T.white }}>{val}</span>
      </>
    );
  }

  // Default
  return <span style={{ color: T.white }}>{linkify(text)}</span>;
}

export default function TerminalOutput({ lines, theme, containerStyle }: TerminalOutputProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 16px',
        fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Courier New', monospace",
        fontSize: '13px',
        lineHeight: '1.7',
        backgroundColor: theme.bg,
        ...containerStyle,
      }}
    >
      {lines.map((line, i) => {
        const texts = line.text.split('\n');
        return (
          <div key={line.id || i}>
            {texts.map((t, j) => {
              let content: React.ReactNode;

              if (line.type === 'input') {
                content = renderInputLine(t);
              } else if (line.type === 'error') {
                content = (
                  <span>
                    <span style={{ color: T.error, fontWeight: 700 }}>✗ </span>
                    <span style={{ color: T.error }}>{t}</span>
                  </span>
                );
              } else if (line.type === 'system') {
                content = (
                  <span>
                    <span style={{ color: T.success }}>◆ </span>
                    <span style={{ color: T.success, opacity: 0.85 }}>{t}</span>
                  </span>
                );
              } else {
                content = renderOutputLine(t);
              }

              return (
                <div key={j} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: t === '' ? '0.6em' : undefined }}>
                  {content}
                </div>
              );
            })}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
