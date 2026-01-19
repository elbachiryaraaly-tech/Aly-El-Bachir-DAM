import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boda Élite 2026 | 10 Octubre",
  description: "Celebra con nosotros nuestra boda de ensueño. Una experiencia inolvidable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased font-sans bg-off-white text-eucalyptus-900 selection:bg-eucalyptus-200 selection:text-eucalyptus-900`}
      >
        {children}
      </body>
    </html>
  );
}
