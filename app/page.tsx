'use client';

import { useState } from 'react';
import ThemeProvider from '@/components/portfolio/ThemeProvider';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import ProjectGrid from '@/components/portfolio/ProjectGrid';
import Skills from '@/components/portfolio/Skills';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import FloatingTerminal from '@/components/portfolio/FloatingTerminal';

export default function Page() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <ThemeProvider>
      <Navbar hidden={terminalOpen} />
      <main style={{ display: terminalOpen ? 'none' : undefined }}>
        <Hero />
        <About />
        <ProjectGrid />
        <Skills />
        <Contact />
        <Footer />
      </main>
      <FloatingTerminal
        open={terminalOpen}
        onToggle={() => setTerminalOpen(o => !o)}
      />
    </ThemeProvider>
  );
}
