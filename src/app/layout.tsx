import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RTQ Abdurrahman bin Auf — Membentuk Generasi Qur'ani",
  description:
    "Rumah Tahfidz Quran Abdurrahman bin Auf (RTQ ABA) — Lembaga pendidikan Islam yang fokus pada tahfidz Al-Qur'an untuk anak usia 6-12 tahun dengan metode holistik dan karakter Islami. Berlokasi di Genteng, Banyuwangi, Jawa Timur.",
  keywords: [
    "RTQ Abdurrahman bin Auf",
    "Rumah Tahfidz Quran",
    "tahfidz anak Banyuwangi",
    "pendidikan Islam Genteng",
    "tahsin Al-Quran",
    "BTQ Banyuwangi",
    "pendaftaran santri",
    "Banyuwangi",
    "Genteng",
    "Jawa Timur",
  ],
  authors: [{ name: "RTQ Abdurrahman bin Auf" }],
  openGraph: {
    title: "RTQ Abdurrahman bin Auf",
    description: "Membentuk Generasi Qur'ani — Pendidikan Tahfidz Quran untuk anak dengan metode holistik.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
