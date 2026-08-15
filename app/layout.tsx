import type { Metadata, Viewport } from 'next';
import './globals.css';

const BASE_URL = 'https://site.ritinder-singh.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Ritinder Singh — Backend & Mobile Developer',
  description: 'Backend and mobile developer building scalable APIs, Flutter apps, and developer tooling. Based remotely — open to co-founder roles, senior engineering positions, and interesting projects.',
  keywords: [
    'Ritinder Singh', 'Backend Developer', 'Mobile Developer', 'Flutter', 'Python',
    'FastAPI', 'TypeScript', 'PostgreSQL', 'Docker', 'Portfolio', 'Software Engineer',
  ],
  authors: [{ name: 'Ritinder Singh', url: BASE_URL }],
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Ritinder Singh',
    title: 'Ritinder Singh — Backend & Mobile Developer',
    description: 'Backend and mobile developer building scalable APIs, Flutter apps, and developer tooling. Open to co-founder roles and senior engineering positions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ritinder Singh — Backend & Mobile Developer',
    description: 'Backend and mobile developer building scalable APIs, Flutter apps, and developer tooling.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
