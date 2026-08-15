'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Skeleton } from '@/components/ui/Skeleton';

interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
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

export default function ProjectGrid() {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/content/projects')
      .then(r => r.json())
      .then((data: Project[]) => { setProjects(data); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <section
      id="projects"
      style={{
        backgroundColor: theme.bgDark,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel color={theme.primary} dim={theme.dim}>projects</SectionLabel>

        {!loaded ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ padding: 20, border: `1px solid ${theme.border}`, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Skeleton width={28} height={28} radius={4} color={theme.primary} />
                  <Skeleton width="50%" height={16} color={theme.primary} />
                </div>
                <Skeleton height={12} color={theme.primary} />
                <Skeleton height={12} color={theme.primary} />
                <Skeleton width="60%" height={12} color={theme.primary} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <Skeleton width={60} height={20} radius={3} color={theme.secondary} />
                  <Skeleton width={60} height={20} radius={3} color={theme.secondary} />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div style={{ color: theme.dim, fontSize: 13 }}>No projects yet — add them in the admin panel.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, theme }: { project: Project; theme: ReturnType<typeof useTheme>['theme'] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: theme.bg,
        border: `1px solid ${hovered ? theme.primary : theme.border}`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        overflow: 'hidden',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Terminal title bar */}
      <div style={{ backgroundColor: theme.bgBar, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }} />
        </div>
        <span style={{ color: theme.dim, fontSize: 12, flex: 1 }}>{project.icon ? `${project.icon} ` : ''}{project.title}</span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <p style={{ color: theme.primary, fontSize: 13, lineHeight: 1.65, margin: 0, opacity: 0.85, flex: 1 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.techStack.map(t => (
            <span
              key={t}
              style={{ backgroundColor: theme.bgDark, border: `1px solid ${theme.border}`, color: theme.secondary, padding: '2px 7px', borderRadius: 3, fontSize: 11 }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: theme.accent, color: '#fff', padding: '6px 12px', borderRadius: 5, textDecoration: 'none', fontSize: 12, fontFamily: 'Courier New, monospace' }}
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'transparent', border: `1px solid ${theme.border}`, color: theme.primary, padding: '6px 12px', borderRadius: 5, textDecoration: 'none', fontSize: 12, fontFamily: 'Courier New, monospace' }}
            >
              Live →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
