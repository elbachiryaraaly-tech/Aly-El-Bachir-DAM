import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Omar Arabic Perfume - Perfumes Árabes de Élite | Tindouf',
  description: 'Descubre la esencia del desierto con nuestros perfumes árabes de élite. Oud, ámbar, azafrán y más. Envío mundial desde Tindouf.',
  keywords: 'perfumes árabes, oud, ámbar, azafrán, perfumes de élite, Tindouf, perfumes orientales',
  openGraph: {
    title: 'Omar Arabic Perfume - Perfumes Árabes de Élite',
    description: 'Descubre la esencia del desierto con nuestros perfumes árabes de élite.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
