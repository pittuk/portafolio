import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luis Cruz — Diseñador Web",
  description: "Portfolio de diseño web de Luis Cruz, Talca Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
