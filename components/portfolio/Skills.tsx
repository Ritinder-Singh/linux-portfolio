'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Skeleton } from '@/components/ui/Skeleton';

interface Skill {
  id: string;
  name: string;
  category: string;
  experienceType: 'professional' | 'personal';
  order: number;
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

export default function Skills() {
  const { theme } = useTheme();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/content/skills')
      .then(r => r.json())
      .then((data: Skill[]) => { setSkills(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  const categories = [...new Set(skills.map(s => s.category))].sort();

  return (
    <section
      id="skills"
      style={{
        backgroundColor: theme.bg,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel color={theme.primary} dim={theme.dim}>skills</SectionLabel>

        {!loaded ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Skeleton width={120} height={14} color={theme.secondary} />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[90, 70, 110, 80, 60].map((w, j) => (
                    <Skeleton key={j} width={w} height={26} radius={4} color={theme.primary} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : skills.length === 0 ? (
          <div style={{ color: theme.dim, fontSize: 13 }}>No skills yet — add them in the admin panel.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {categories.map(category => {
              const categorySkills = skills
                .filter(s => s.category === category)
                .sort((a, b) => a.order - b.order);

              return (
                <div key={category}>
                  <div style={{ color: theme.secondary, fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: theme.dim }}>$</span>
                    <span>{category}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {categorySkills.map(skill => {
                      const isPro = skill.experienceType === 'professional';
                      return (
                        <span
                          key={skill.id}
                          title={isPro ? 'Professional experience' : 'Personal / hobby'}
                          style={{
                            backgroundColor: isPro ? `${theme.primary}22` : 'transparent',
                            border: `1px solid ${isPro ? `${theme.primary}99` : `${theme.secondary}55`}`,
                            color: isPro ? theme.primary : theme.secondary,
                            padding: '4px 12px',
                            borderRadius: 4,
                            fontSize: 13,
                            cursor: 'default',
                            fontWeight: isPro ? 600 : 400,
                          }}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 11, color: theme.dim }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 22, height: 14, borderRadius: 3, backgroundColor: `${theme.primary}22`, border: `1px solid ${theme.primary}99`, display: 'inline-block' }} />
                professional
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 22, height: 14, borderRadius: 3, backgroundColor: 'transparent', border: `1px solid ${theme.secondary}55`, display: 'inline-block' }} />
                personal / hobby
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
