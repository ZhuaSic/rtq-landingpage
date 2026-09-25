"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ────────────────────────────────────────────────────────
   NAVBAR (Floating Pill Header matching Mockup)
──────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "profil", label: "Profil" },
    { id: "struktur", label: "Struktur" },
    { id: "program", label: "Program" },
    { id: "jadwal", label: "Jadwal & Biaya" },
    { id: "galeri", label: "Galeri" },
    { id: "pendaftaran", label: "Pendaftaran" },
    { id: "kontak", label: "Kontak" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg border border-neutral-200/80"
              : "bg-white/95 shadow-md border border-neutral-100"
          }`}
        >
          {/* Logo & Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
            onClick={() => scrollTo("beranda")}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-rtq-gold-400 p-0.5 bg-white shadow-sm">
              <Image
                src="/logo-official.png"
                alt="Logo RTQ ABA"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm md:text-base text-rtq-green-900 tracking-tight leading-tight">
                RTQ ABDURRAHMAN
              </span>
              <span className="font-extrabold text-[10px] sm:text-xs md:text-sm text-rtq-green-800 tracking-wide">
                BIN AUF
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-rtq-green-900 font-bold"
                      : "text-neutral-600 hover:text-rtq-green-800"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-rtq-gold-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => scrollTo("pendaftaran")}
              className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-rtq-gold-400 to-rtq-gold-500 hover:from-rtq-gold-500 hover:to-rtq-gold-600 text-rtq-green-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-gold transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-rtq-green-900 hover:bg-neutral-100 transition"
              aria-label="Buka Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-rtq-green-950 text-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Image src="/logo-official.png" alt="Logo RTQ" width={40} height={40} className="rounded-full" />
                <span className="font-extrabold text-sm text-rtq-gold-300">RTQ ABA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition ${
                    activeSection === link.id
                      ? "bg-rtq-gold-400 text-rtq-green-950 font-bold"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={() => scrollTo("pendaftaran")}
              className="w-full py-3.5 bg-rtq-gold-400 text-rtq-green-950 font-extrabold rounded-xl text-center shadow-lg hover:bg-rtq-gold-300 transition"
            >
              Daftar Santri Baru ↗
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────
   HERO / BERANDA SECTION (Matching Mockup Attached)
──────────────────────────────────────────────────────── */
function HeroSection() {
  const keunggulan = [
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm-1 18H6c-.6 0-1-.4-1-1s.4-1 1-1h12v2zm0-4H6c-1.1 0-2 .9-2 2V5c0-.6.4-1 1-1h13v12z"/>
          <path d="M8 8h8v2H8zm0 4h5v2H8z"/>
        </svg>
      ),
      label: "Tahfidz Quran",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      ),
      label: "Pendidikan Karakter",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 2c-.6 0-1 .4-1 1v.5C8.2 4.1 6 6.8 6 10v4H4v7h16v-7h-2v-4c0-3.2-2.2-5.9-5-6.5V3c0-.6-.4-1-1-1zm0 3.5c2.5 0 4.5 2 4.5 4.5v4h-9v-4c0-2.5 2-4.5 4.5-4.5zM11 16h2v3h-2v-3z"/>
        </svg>
      ),
      label: "Lingkungan Islami",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      label: "Akhlak Mulia",
    },
  ];

  const programFasilitas = [
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      title: "Kurikulum Bertaraf",
      desc: "Standar tahfidz terstruktur & bertahap",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7-9.5l-1.5 1.5 1.5 1.5 1.5-1.5-1.5-1.5z"/>
        </svg>
      ),
      title: "Guru Bersertifikat",
      desc: "Pengajar berpengalaman & bersanad",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
        </svg>
      ),
      title: "Metode Tahfidz",
      desc: "Metode murojaah & tikrar yang efektif",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      title: "Kelas Kecil Personal",
      desc: "1 kelas maksimal 10 santri",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      title: "Lingkungan Islami",
      desc: "Adab dan akhlak ditanamkan harian",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0c3624]" viewBox="0 0 24 24">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-2.22l1.35-1.76C14.31 4.09 14.63 4 15 4zM9 4c.37 0 .69.09.87.24L11.22 6H9c-.55 0-1-.45-1-1s.45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76V8h2v.76L15.38 12 17 10.83 14.92 8H20v6z"/>
        </svg>
      ),
      title: "Beasiswa Santri",
      desc: "Bantuan pendidikan untuk yang berprestasi",
    },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="beranda" className="relative pt-24 sm:pt-28 pb-10 sm:pb-14 px-3 sm:px-4 islamic-pattern-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* 1. LEFT WHITE CARD (Identity & Keunggulan) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-neutral-100 flex flex-col items-center text-center justify-between gap-3 transition hover:shadow-md">
            {/* Logo Emblem */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-rtq-gold-300 p-0.5 bg-white shadow-xs flex items-center justify-center mb-1.5">
                <Image
                  src="/logo-official.png"
                  alt="RTQ Abdurrahman bin Auf"
                  width={72}
                  height={72}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <h1 className="font-extrabold text-sm sm:text-base text-rtq-green-900 leading-tight">
                RTQ<br />Abdurrahman bin Auf
              </h1>
              <p className="text-[10px] text-neutral-500 italic mt-0.5 font-medium">
                Generasi Qur&apos;ani Penerus Peradaban Mulia
              </p>
            </div>

            {/* Keunggulan Kami 2x2 Grid */}
            <div className="w-full">
              <h2 className="text-[11px] font-bold text-rtq-green-900 mb-2 uppercase tracking-wider">
                Keunggulan Kami
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {keunggulan.map((k) => (
                  <div
                    key={k.label}
                    className="bg-[#FDF6E2] hover:bg-[#faeec8] border border-rtq-gold-200/50 rounded-xl p-2.5 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5 shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center mb-1">
                      {k.icon}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-rtq-green-900 leading-tight">
                      {k.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Contact Pill */}
            <div className="w-full bg-[#EBF7F0] border border-[#d2edd9] rounded-xl py-2 px-3 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] text-[#0c3624]">
              <span className="font-semibold flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Banyuwangi</span>
              </span>
              <a
                href="https://wa.me/6285212185139"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0c3624] hover:text-emerald-700 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                </svg>
                <span>0852-1218-5139</span>
              </a>
            </div>
          </div>

          {/* 2. UNIFIED RIGHT CONTAINER (Hero Banner Card Flush Left + Program & Fasilitas inside 1 Card) */}
          <div className="lg:col-span-8 bg-[#F8F3EA] rounded-3xl overflow-hidden shadow-sm border border-[#ede5d4] grid grid-cols-1 md:grid-cols-12 items-stretch">
            
            {/* Left Column: Dark Green Hero Banner Card (Full flush to Top, Left, and Bottom) */}
            <div className="md:col-span-6 lg:col-span-6 relative bg-[#0c3624] flex flex-col justify-end w-full h-[400px] sm:h-[440px] lg:h-[460px] min-h-[380px] overflow-hidden">
              {/* Full Background Photo */}
              <Image
                src="/hero-santri-exact.jpg"
                alt="Santri RTQ ABA Membaca Al-Qur'an"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-top"
                priority
              />

              {/* Dark Green Gradient Bottom Only (Sangat rendah di bagian bawah agar foto santri terlihat penuh & jelas) */}
              <div className="absolute bottom-0 inset-x-0 h-36 sm:h-40 bg-gradient-to-t from-[#0c3624] via-[#0c3624]/90 to-transparent pointer-events-none" />

              {/* Text & Buttons at bottom */}
              <div className="relative z-10 px-3 pb-3 pt-1 text-center flex flex-col items-center justify-center">
                <h2 className="font-serif text-base sm:text-lg font-bold text-[#F3CD67] leading-tight text-center drop-shadow-sm mb-0.5">
                  <span className="block text-[11px] sm:text-xs font-normal text-[#F3CD67]">Membentuk</span>
                  Generasi Qur&apos;ani
                </h2>
                <p className="text-[10px] text-white/95 leading-tight max-w-[210px] mb-2.5 font-normal text-center drop-shadow-sm">
                  Pendidikan Tahfidz Quran untuk anak usia 6-12 tahun dengan metode holistik dan karakter Islami
                </p>
                
                <div className="flex flex-row items-center justify-center gap-2 w-full max-w-[220px]">
                  <button
                    onClick={() => scrollTo("pendaftaran")}
                    className="flex-1 bg-[#E8B54D] hover:bg-[#d9a338] text-[#0c3624] font-bold text-[10px] px-2 py-1.5 rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5 text-center whitespace-nowrap"
                  >
                    Daftar Sekarang
                  </button>
                  <button
                    onClick={() => scrollTo("program")}
                    className="flex-1 bg-transparent hover:bg-white/10 border border-white/70 text-white font-medium text-[10px] px-2 py-1.5 rounded-lg transition text-center whitespace-nowrap"
                  >
                    Lihat Program
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Program & Fasilitas (Spacious & Centered) */}
            <div className="md:col-span-6 lg:col-span-6 p-4 sm:p-6 lg:p-7 flex flex-col justify-center">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0c3624] mb-4 tracking-tight flex items-center gap-2">
                <span>Program &amp; Fasilitas</span>
              </h2>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {programFasilitas.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F5DA9A] text-[#0c3624] flex items-center justify-center flex-shrink-0 text-sm sm:text-base shadow-xs group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-xs sm:text-sm text-[#0c3624] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-neutral-600 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   STATS COUNTER BAR
──────────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    {
      number: "150+",
      label: "Santri Aktif",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-[#E8B54D]" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
    },
    {
      number: "30+",
      label: "Hafiz/Hafizhah",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-[#E8B54D]" viewBox="0 0 24 24">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
        </svg>
      ),
    },
    {
      number: "6+",
      label: "Tahun Mengabdi",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-[#E8B54D]" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
    },
    {
      number: "10",
      label: "Maks. Santri/Kelas",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-[#E8B54D]" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-r from-rtq-green-900 via-rtq-green-800 to-rtq-green-900 text-white py-8 border-y-4 border-rtq-gold-400 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="mb-2 flex items-center justify-center">{s.icon}</div>
              <span className="font-serif font-extrabold text-2xl sm:text-4xl text-rtq-gold-300 leading-none">
                {s.number}
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   ABOUT / PROFIL SECTION
──────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────
   ABOUT / PROFIL SECTION (Matching Reference Screenshot)
──────────────────────────────────────────────────────── */
function AboutSection() {
  const pilar = [
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      title: "IKHLAS",
      desc: "Menjalankan tugas dan dapat dipercaya dalam ilmu, tugas, serta amanah pendidikan",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
        </svg>
      ),
      title: "AMANAH",
      desc: "Bertanggung jawab dan dapat dipercaya sebagai cahaya kehidupan",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm-1 18H6c-.6 0-1-.4-1-1s.4-1 1-1h12v2zm0-4H6c-1.1 0-2 .9-2 2V5c0-.6.4-1 1-1h13v12z"/>
          <path d="M8 8h8v2H8zm0 4h5v2H8z"/>
        </svg>
      ),
      title: "ILMU",
      desc: "Terus menuntut ilmu Al-Qur'an dan ilmu pengetahuan sebagai cahaya kehidupan",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 2c-.6 0-1 .4-1 1v.5C8.2 4.1 6 6.8 6 10v4H4v7h16v-7h-2v-4c0-3.2-2.2-5.9-5-6.5V3c0-.6-.4-1-1-1zm0 3.5c2.5 0 4.5 2 4.5 4.5v4h-9v-4c0-2.5 2-4.5 4.5-4.5zM11 16h2v3h-2v-3z"/>
        </svg>
      ),
      title: "AKHLAK",
      desc: "Membentuk kepribadian santri yang berbudi luhur, santun, dan bermanfaat bagi sesama",
    },
  ];

  return (
    <section id="profil" className="w-full">
      {/* 1. Header Banner "Profil Kami" */}
      <div className="bg-[#0c3624] text-white py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Islamic pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E8B54D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Profil Kami
          </h1>
          <p className="text-sm sm:text-base text-[#E8B54D] font-medium tracking-wide">
            Mengenal lebih dekat RTQ — Rumah Tahfiz Al-Quran
          </p>
        </div>
      </div>

      {/* 2. Tentang RTQ (White Background + Ornamental Frame Image) */}
      <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0c3624] mb-4 tracking-tight">
              Tentang RTQ
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-3">
              <strong>RTQ (Rumah Tahfiz Al-Quran)</strong> adalah lembaga pendidikan Islam yang fokus pada pembinaan generasi penghafal Al-Qur&apos;an sejak tahun 2018. Berlokasi di lingkungan yang asri dan kondusif, RTQ hadir sebagai wadah untuk mendidik anak-anak dan remaja agar tumbuh dengan kecintaan terhadap Al-Qur&apos;an, akhlak mulia, serta ilmu yang bermanfaat.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              Kami berkomitmen mencetak santri yang berakhlak Qur&apos;ani, berdaya saing, dan berkontribusi positif bagi masyarakat melalui pembelajaran Al-Qur&apos;an yang sistematis, terpadu, dan modern dengan tetap berpegang pada nilai-nilai Islam Ahlus Sunnah Wal Jamaah.
            </p>

            {/* 3 Golden Badges / Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="bg-white border border-[#E8B54D] rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-[#FDF6E2] text-[#0c3624] flex items-center justify-center text-xs">
                  <svg className="w-3 h-3 fill-[#0c3624]" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                </span>
                <span className="text-xs font-bold text-[#0c3624]">150+ Santri Aktif</span>
              </div>
              <div className="bg-white border border-[#E8B54D] rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-[#FDF6E2] text-[#0c3624] flex items-center justify-center text-xs">
                  <svg className="w-3 h-3 fill-[#0c3624]" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </span>
                <span className="text-xs font-bold text-[#0c3624]">30+ Hafizh/Hafizhah</span>
              </div>
              <div className="bg-white border border-[#E8B54D] rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-xs">
                <span className="w-5 h-5 rounded-full bg-[#FDF6E2] text-[#0c3624] flex items-center justify-center text-xs">
                  <svg className="w-3 h-3 fill-[#0c3624]" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  </svg>
                </span>
                <span className="text-xs font-bold text-[#0c3624]">6 Tahun Mengabdi</span>
              </div>
            </div>
          </div>

          {/* Right Ornamental Image (Crisp & Fully Visible) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-[480px] flex items-center justify-center">
              <Image
                src="/quran-ornament.jpg"
                alt="Al-Qur'anul Karim RTQ"
                width={650}
                height={350}
                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-300"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Visi, Misi & 4 Pilar Section */}
      <div className="bg-[#FAF8F4] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c3624] tracking-tight">
              Visi &amp; Misi
            </h2>
            <div className="w-12 h-1 bg-[#E8B54D] mx-auto rounded-full mt-2" />
          </div>

          {/* 3-Column Layout: VISI (3 cols) | MISI (3 cols) | 4 Pilar Nilai RTQ (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* Card 1: VISI */}
            <div className="lg:col-span-3 bg-[#0c3624] text-white rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center shadow-md border border-[#164e32]">
              <div className="w-12 h-12 rounded-full bg-[#E8B54D] text-[#0c3624] flex items-center justify-center text-xl font-bold mb-3 shadow-xs">
                <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#F3CD67] text-base uppercase tracking-wider mb-2">
                VISI
              </h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Menjadi lembaga tahfiz Al-Qur&apos;an terpercaya yang melahirkan generasi penghafal Al-Qur&apos;an berakhlak mulia, cerdas, dan berdaya saing untuk membangun peradaban Islami yang rahmatan lil&apos;alamin.
              </p>
            </div>

            {/* Card 2: MISI */}
            <div className="lg:col-span-3 bg-white border-2 border-[#E8B54D]/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col">
              <div className="flex flex-col items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-[#E8B54D] text-[#0c3624] flex items-center justify-center text-xl font-bold mb-2 shadow-xs">
                  <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#0c3624] text-base uppercase tracking-wider">
                  MISI
                </h3>
              </div>
              <ul className="text-xs text-neutral-700 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E8B54D] text-[#0c3624] font-extrabold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="leading-snug">
                    Menyelenggarakan pendidikan tahfiz Al-Qur&apos;an dengan metode yang sistematis dan berkesinambungan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E8B54D] text-[#0c3624] font-extrabold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="leading-snug">
                    Membina akhlak dan karakter Islami melalui keteladanan dan pembiasaan ibadah.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E8B54D] text-[#0c3624] font-extrabold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="leading-snug">
                    Mengembangkan pembelajaran terpadu antara Al-Qur&apos;an, ilmu umum, dan keterampilan hidup.
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 3: 4 Pilar Nilai RTQ */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="text-center mb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#0c3624] tracking-tight">
                  4 Pilar Nilai RTQ
                </h3>
                <p className="text-[11px] sm:text-xs text-neutral-500">
                  Nilai-nilai utama yang menjadi fondasi pendidikan kami
                </p>
              </div>

              {/* 4 Cards Grid - 4 Columns in 1 Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 h-full items-stretch">
                {pilar.map((p) => (
                  <div
                    key={p.title}
                    className="bg-white border border-[#E8B54D]/70 rounded-xl p-2.5 sm:p-3 flex flex-col items-center text-center shadow-xs hover:border-[#E8B54D] transition-colors justify-start"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#FDF6E2] border border-[#E8B54D]/60 text-[#0c3624] flex items-center justify-center text-base mb-2 flex-shrink-0">
                      {p.icon}
                    </div>
                    <div className="font-extrabold text-[11px] sm:text-xs text-[#0c3624] uppercase tracking-wide mb-1.5">
                      {p.title}
                    </div>
                    <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   STRUKTUR ORGANISASI RTQ ABDURRAHMAN BIN AUF
──────────────────────────────────────────────────────── */
function StrukturOrganisasiSection() {
  const [mobileMode, setMobileMode] = useState<"bagan" | "daftar">("bagan");

  return (
    <section id="struktur" className="py-16 sm:py-24 px-3 sm:px-6 bg-[#FAF8F4] relative border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#9B7B3B] uppercase mb-2">
            YAYASAN KESEJAHTERAAN UMAT BANYUWANGI · YASKUB
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0c3624] tracking-tight mb-1">
            Struktur Organisasi
          </h2>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0c3624] tracking-tight mb-1">
            RTQ Abdurrahman bin Auf
          </h3>
          <p className="text-xs sm:text-sm text-[#5c7065] font-normal">
            Rumah Tahfidz Qur&apos;an
          </p>

          {/* Mobile View Toggle */}
          <div className="lg:hidden mt-6 inline-flex p-1 bg-white border border-neutral-200 rounded-xl shadow-xs">
            <button
              onClick={() => setMobileMode("bagan")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                mobileMode === "bagan"
                  ? "bg-[#0c3624] text-white shadow-xs"
                  : "text-neutral-600 hover:text-[#0c3624]"
              }`}
            >
              📊 Bagan Lengkap (Sesuai Foto)
            </button>
            <button
              onClick={() => setMobileMode("daftar")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                mobileMode === "daftar"
                  ? "bg-[#0c3624] text-white shadow-xs"
                  : "text-neutral-600 hover:text-[#0c3624]"
              }`}
            >
              📋 Daftar Hierarki
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            1. BAGAN LENGKAP (Diagram Hierarki Sesuai Foto)
           ════════════════════════════════════════════════════════ */}
        <div className={`${mobileMode === "daftar" ? "hidden lg:block" : "block"}`}>
          {/* Mobile Swipe Hint */}
          <div className="lg:hidden text-center mb-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-600 bg-white border border-neutral-200/90 px-3.5 py-1 rounded-full shadow-xs">
              <span>👉</span> Geser ke samping untuk melihat seluruh bagan <span>👈</span>
            </span>
          </div>

          <div className="overflow-x-auto pb-8 pt-2 -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="min-w-[1040px] max-w-[1040px] mx-auto flex flex-col items-center">

              {/* 1. TOP NODE: RTQ Abdurrahman bin Auf */}
              <div className="bg-[#0c3624] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-xs">
                RTQ Abdurrahman bin Auf
              </div>

              {/* Vertical Connector Line to Mudir */}
              <div className="w-[1.75px] h-5 bg-[#5A8270]" />

              {/* 2. PIMPINAN: Mudir / Kepala RTQ */}
              <div className="bg-[#0c3624] text-white rounded-xl px-7 py-2.5 text-center shadow-md min-w-[260px] max-w-[300px]">
                <div className="text-[10px] font-bold text-[#DEAB3E] tracking-widest uppercase mb-0.5">
                  PIMPINAN
                </div>
                <h4 className="font-bold text-[14px] text-white leading-tight">
                  Mudir / Kepala RTQ
                </h4>
                <p className="text-[10px] text-white/85 leading-snug mt-0.5">
                  Penanggung jawab tertinggi operasional
                </p>
              </div>

              {/* Main Tree Connector SVG: Splits from Mudir to 5 Columns */}
              <svg className="w-[1040px] h-9 block" viewBox="0 0 1040 36" fill="none">
                {/* Stem down from Mudir (center at 520) */}
                <path d="M 520 0 L 520 18" stroke="#5A8270" strokeWidth="1.75" />
                {/* Horizontal Bar spanning across all 5 column centers */}
                <path d="M 150 18 L 890 18" stroke="#5A8270" strokeWidth="1.75" />
                {/* 5 Drops to the 5 nodes */}
                <path d="M 150 18 L 150 36" stroke="#5A8270" strokeWidth="1.75" />
                <path d="M 382.5 18 L 382.5 36" stroke="#5A8270" strokeWidth="1.75" />
                <path d="M 520 18 L 520 36" stroke="#5A8270" strokeWidth="1.75" />
                <path d="M 657.5 18 L 657.5 36" stroke="#5A8270" strokeWidth="1.75" />
                <path d="M 890 18 L 890 36" stroke="#5A8270" strokeWidth="1.75" />
              </svg>

              {/* 3. ROW OF 5 MAIN SECTIONS */}
              <div className="flex items-start justify-between w-[1040px]">

                {/* ──────────────────────────────────────────
                    COLUMN 1: Akademik & Tahfidz (300px)
                    ────────────────────────────────────────── */}
                <div className="w-[300px] flex flex-col items-center">
                  {/* Level 2 Card: Akademik & Tahfidz */}
                  <div className="w-[160px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2.5 text-center shadow-xs flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                      BIDANG
                    </div>
                    <h4 className="font-bold text-[11.5px] text-[#0c3624] leading-snug mb-0.5">
                      Akademik &amp; Tahfidz
                    </h4>
                    <p className="text-[9px] text-[#555555] leading-tight">
                      Target hafalan, marhalah, talaqqi &amp; muroja&apos;ah, evaluasi
                    </p>
                  </div>

                  {/* Sub-tree Connector SVG under Akademik & Tahfidz */}
                  <svg className="w-[300px] h-8 block" viewBox="0 0 300 32" fill="none">
                    {/* Stem from card center (150) */}
                    <path d="M 150 0 L 150 16" stroke="#5A8270" strokeWidth="1.75" />
                    {/* Horizontal Bar across the 3 sub-cards (47 to 253) */}
                    <path d="M 47 16 L 253 16" stroke="#5A8270" strokeWidth="1.75" />
                    {/* 3 Drops to sub-cards */}
                    <path d="M 47 16 L 47 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 150 16 L 150 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 253 16 L 253 32" stroke="#5A8270" strokeWidth="1.75" />
                  </svg>

                  {/* 3 Sub-columns under Akademik */}
                  <div className="flex items-start gap-[9px] w-[300px]">
                    
                    {/* Sub-col 1: Koordinator Halaqah + Pelaksana Muhaffizh */}
                    <div className="w-[94px] flex flex-col items-center">
                      <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                        <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                          KOORDINATOR
                        </div>
                        <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                          Koordinator Halaqah
                        </h5>
                        <p className="text-[8px] text-[#555555] leading-tight">
                          Pembagian halaqah &amp; jadwal setoran
                        </p>
                      </div>

                      {/* Connector line down to Muhaffizh */}
                      <div className="w-[1.75px] h-4 bg-[#5A8270]" />

                      <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                        <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                          PELAKSANA
                        </div>
                        <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                          Muhaffizh / Muhaffizhah
                        </h5>
                        <p className="text-[8px] text-[#555555] leading-tight">
                          Pengampu halaqah &amp; bimbingan setoran
                        </p>
                      </div>
                    </div>

                    {/* Sub-col 2: Koordinator Kurikulum */}
                    <div className="w-[94px] flex flex-col items-center">
                      <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                        <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                          KOORDINATOR
                        </div>
                        <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                          Koordinator Kurikulum
                        </h5>
                        <p className="text-[8px] text-[#555555] leading-tight">
                          Penyusunan &amp; penyelarasan kurikulum tahfidz &amp; mapel umum
                        </p>
                      </div>
                    </div>

                    {/* Sub-col 3: Guru */}
                    <div className="w-[94px] flex flex-col items-center">
                      <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                        <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                          PELAKSANA
                        </div>
                        <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                          Guru
                        </h5>
                        <p className="text-[8px] text-[#555555] leading-tight">
                          Pengajar mata pelajaran umum &amp; penunjang
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ──────────────────────────────────────────
                    COLUMN 2: Kesantrian & Pengasuhan (110px)
                    ────────────────────────────────────────── */}
                <div className="w-[110px] flex flex-col items-center">
                  <div className="w-[110px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-[#9B7B3B] uppercase tracking-wider mb-0.5">
                      BIDANG
                    </div>
                    <h4 className="font-bold text-[11px] text-[#0c3624] leading-snug mb-0.5">
                      Kesantrian &amp; Pengasuhan
                    </h4>
                    <p className="text-[8.5px] text-[#555555] leading-tight">
                      Akhlak, kedisiplinan &amp; pembinaan karakter
                    </p>
                  </div>
                </div>

                {/* ──────────────────────────────────────────
                    COLUMN 3: Sarpras & Umum (110px)
                    ────────────────────────────────────────── */}
                <div className="w-[110px] flex flex-col items-center">
                  <div className="w-[110px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-[#9B7B3B] uppercase tracking-wider mb-0.5">
                      BIDANG
                    </div>
                    <h4 className="font-bold text-[11px] text-[#0c3624] leading-snug mb-0.5">
                      Sarpras &amp; Umum
                    </h4>
                    <p className="text-[8.5px] text-[#555555] leading-tight">
                      Fasilitas, logistik &amp; kerumahtanggaan
                    </p>
                  </div>
                </div>

                {/* ──────────────────────────────────────────
                    COLUMN 4: Humas & Kerja Sama (110px)
                    ────────────────────────────────────────── */}
                <div className="w-[110px] flex flex-col items-center">
                  <div className="w-[110px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-[#9B7B3B] uppercase tracking-wider mb-0.5">
                      BIDANG
                    </div>
                    <h4 className="font-bold text-[11px] text-[#0c3624] leading-snug mb-0.5">
                      Humas &amp; Kerja Sama
                    </h4>
                    <p className="text-[8.5px] text-[#555555] leading-tight">
                      Walisantri, donatur &amp; kemitraan
                    </p>
                  </div>
                </div>

                {/* ──────────────────────────────────────────
                    COLUMN 5: Koordinator Tata Usaha (300px)
                    ────────────────────────────────────────── */}
                <div className="w-[300px] flex flex-col items-center">
                  {/* Level 2 Card: Koordinator Tata Usaha */}
                  <div className="w-[160px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2.5 text-center shadow-xs flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-[#9B7B3B] uppercase tracking-wider mb-0.5">
                      PENDUKUNG
                    </div>
                    <h4 className="font-bold text-[11.5px] text-[#0c3624] leading-snug mb-0.5">
                      Koordinator Tata Usaha
                    </h4>
                    <p className="text-[9px] text-[#555555] leading-tight">
                      Memimpin &amp; mengoordinasikan seluruh administrasi RTQ
                    </p>
                  </div>

                  {/* Sub-tree Connector SVG under Tata Usaha */}
                  <svg className="w-[300px] h-8 block" viewBox="0 0 300 32" fill="none">
                    {/* Stem from card center (150) */}
                    <path d="M 150 0 L 150 16" stroke="#5A8270" strokeWidth="1.75" />
                    {/* Horizontal Bar across the 3 sub-cards (47 to 253) */}
                    <path d="M 47 16 L 253 16" stroke="#5A8270" strokeWidth="1.75" />
                    {/* 3 Drops to sub-cards */}
                    <path d="M 47 16 L 47 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 150 16 L 150 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 253 16 L 253 32" stroke="#5A8270" strokeWidth="1.75" />
                  </svg>

                  {/* 3 Sub-columns under Tata Usaha */}
                  <div className="flex items-start gap-[9px] w-[300px]">
                    
                    {/* Sub-col 1: Staf Administrasi & Kesantrian */}
                    <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                      <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                        STAF TU
                      </div>
                      <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                        Staf Administrasi &amp; Kesantrian
                      </h5>
                      <p className="text-[8px] text-[#555555] leading-tight">
                        Data santri, surat-menyurat, arsip dokumen
                      </p>
                    </div>

                    {/* Sub-col 2: Staf Presensi & Kepegawaian */}
                    <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                      <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                        STAF TU
                      </div>
                      <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                        Staf Presensi &amp; Kepegawaian
                      </h5>
                      <p className="text-[8px] text-[#555555] leading-tight">
                        Operasional RTQ Absensi &amp; data kepegawaian
                      </p>
                    </div>

                    {/* Sub-col 3: Staf Pengelolaan Keuangan & Pembukuan */}
                    <div className="w-[94px] min-h-[96px] bg-white border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center">
                      <div className="text-[8.5px] font-bold text-[#0c3624] uppercase tracking-wider mb-0.5">
                        STAF TU
                      </div>
                      <h5 className="font-bold text-[10px] text-[#0c3624] leading-tight mb-0.5">
                        Staf Pengelolaan Keuangan &amp; Pembukuan
                      </h5>
                      <p className="text-[8px] text-[#555555] leading-tight">
                        Kas harian, pembayaran wali santri, pelaporan
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Subtle Divider Line matching the photo */}
              <div className="w-full max-w-4xl h-px bg-[#E2D8C3] mt-14" />

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            2. DAFTAR HIERARKI (Alternatif Tampilan Mobile / Rapi)
           ════════════════════════════════════════════════════════ */}
        <div className={`space-y-4 max-w-md mx-auto ${mobileMode === "daftar" ? "block" : "hidden"}`}>
          {/* Mudir Card */}
          <div className="bg-[#0c3624] text-white rounded-2xl p-4 text-center shadow-md">
            <span className="text-[10px] font-bold text-[#DEAB3E] tracking-widest uppercase block mb-1">
              PIMPINAN
            </span>
            <h4 className="font-bold text-base text-white">Mudir / Kepala RTQ</h4>
            <p className="text-xs text-white/80 mt-1">Penanggung jawab tertinggi operasional</p>
          </div>

          {/* 1. Bidang Akademik & Tahfidz */}
          <div className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#0c3624] uppercase tracking-wider block mb-1">
              BIDANG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Akademik &amp; Tahfidz</h4>
            <p className="text-xs text-neutral-600 mb-3">
              Target hafalan, marhalah, talaqqi &amp; muroja&apos;ah, evaluasi
            </p>
            <div className="space-y-2 pl-3 border-l-2 border-[#9B7B3B]/40">
              <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30">
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">KOORDINATOR</span>
                <span className="text-xs font-bold text-[#0c3624] block">Koordinator Halaqah</span>
                <span className="text-[10px] text-neutral-600 block">Pembagian halaqah &amp; jadwal setoran</span>
                <div className="mt-2 pt-2 border-t border-neutral-200">
                  <span className="text-[9px] font-bold text-[#0c3624] uppercase block">PELAKSANA</span>
                  <span className="text-xs font-bold text-[#0c3624] block">Muhaffizh / Muhaffizhah</span>
                  <span className="text-[10px] text-neutral-600 block">Pengampu halaqah &amp; bimbingan setoran</span>
                </div>
              </div>
              <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30">
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">KOORDINATOR</span>
                <span className="text-xs font-bold text-[#0c3624] block">Koordinator Kurikulum</span>
                <span className="text-[10px] text-neutral-600 block">Penyusunan &amp; penyelarasan kurikulum tahfidz &amp; mapel umum</span>
              </div>
              <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30">
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">PELAKSANA</span>
                <span className="text-xs font-bold text-[#0c3624] block">Guru</span>
                <span className="text-[10px] text-neutral-600 block">Pengajar mata pelajaran umum &amp; penunjang</span>
              </div>
            </div>
          </div>

          {/* 2. Bidang Kesantrian & Pengasuhan */}
          <div className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
              BIDANG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Kesantrian &amp; Pengasuhan</h4>
            <p className="text-xs text-neutral-600">
              Akhlak, kedisiplinan &amp; pembinaan karakter
            </p>
          </div>

          {/* 3. Bidang Sarpras & Umum */}
          <div className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
              BIDANG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Sarpras &amp; Umum</h4>
            <p className="text-xs text-neutral-600">
              Fasilitas, logistik &amp; kerumahtanggaan
            </p>
          </div>

          {/* 4. Bidang Humas & Kerja Sama */}
          <div className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
              BIDANG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Humas &amp; Kerja Sama</h4>
            <p className="text-xs text-neutral-600">
              Walisantri, donatur &amp; kemitraan
            </p>
          </div>

          {/* 5. Koordinator Tata Usaha */}
          <div className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
              PENDUKUNG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Koordinator Tata Usaha</h4>
            <p className="text-xs text-neutral-600 mb-3">
              Memimpin &amp; mengoordinasikan seluruh administrasi RTQ
            </p>
            <div className="space-y-2 pl-3 border-l-2 border-[#9B7B3B]/40">
              <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30">
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">STAF TU</span>
                <span className="text-xs font-bold text-[#0c3624] block">Staf Administrasi &amp; Kesantrian</span>
                <span className="text-[10px] text-neutral-600 block">Data santri, surat-menyurat, arsip dokumen</span>
              </div>
              <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30">
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">STAF TU</span>
                <span className="text-xs font-bold text-[#0c3624] block">Staf Presensi &amp; Kepegawaian</span>
                <span className="text-[10px] text-neutral-600 block">Operasional RTQ Absensi &amp; data kepegawaian</span>
              </div>
              <div className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30">
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">STAF TU</span>
                <span className="text-xs font-bold text-[#0c3624] block">Staf Pengelolaan Keuangan &amp; Pembukuan</span>
                <span className="text-[10px] text-neutral-600 block">Kas harian, pembayaran wali santri, pelaporan</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   PROGRAM PENDIDIKAN
──────────────────────────────────────────────────────── */
function ProgramsSection() {
  const utama = [
    {
      icon: (
        <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Tahsin",
      sub: "Perbaikan Bacaan Al-Qur'an",
      desc: "Pelatihan tajwid, makharijul huruf, dan kefasihan membaca Al-Qur'an sesuai kaidah.",
      bg: "bg-emerald-800 text-white",
    },
    {
      icon: (
        <svg className="w-8 h-8 fill-current text-rtq-green-950" viewBox="0 0 24 24">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
        </svg>
      ),
      title: "Tahfidz",
      sub: "Menghafal Al-Qur'an",
      desc: "Target hafalan terstruktur hingga 30 juz dengan bimbingan ustadz/ustadzah bersanad.",
      bg: "bg-gradient-to-br from-rtq-gold-400 to-rtq-gold-500 text-rtq-green-950",
    },
    {
      icon: (
        <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24">
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
        </svg>
      ),
      title: "Murajaah",
      sub: "Mengulang Hafalan",
      desc: "Sistem pengulangan terjadwal untuk menjaga kekuatan dan kelancaran hafalan santri.",
      bg: "bg-[#2563EB] text-white",
    },
    {
      icon: (
        <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      ),
      title: "BTQ",
      sub: "Baca Tulis Qur'an",
      desc: "Dasar pengenalan huruf hijaiyah, kaidah penulisan arab, dan iqro untuk pemula.",
      bg: "bg-[#DB2777] text-white",
    },
  ];

  const tambahan = [
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
      ),
      title: "Kalam Islami",
      desc: "Adab dan etika santri dalam keseharian",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      title: "Doa Harian",
      desc: "Hafalan doa-doa harian mustajab",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
      ),
      title: "Bahasa Arab",
      desc: "Dasar kosa kata & percakapan ringan",
    },
    {
      icon: (
        <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      title: "Hafalan Hadist",
      desc: "Kumpulan hadist pilihan tentang akhlak",
    },
  ];

  return (
    <section id="program" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-rtq-green-100 text-rtq-green-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            Kurikulum
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-rtq-green-900 mb-3">
            Program Pendidikan
          </h2>
          <div className="w-16 h-1 bg-rtq-gold-400 rounded-full mx-auto mb-4" />
          <p className="text-sm sm:text-base text-neutral-600">
            Kurikulum terintegrasi untuk membangun santri yang fasih membaca, kuat menghafal, dan berakhlak mulia.
          </p>
        </div>

        {/* Program Utama 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {utama.map((p) => (
            <div
              key={p.title}
              className={`${p.bg} rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1`}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 shadow-inner">
                {p.icon}
              </div>
              <h3 className="font-extrabold text-xl mb-1">{p.title}</h3>
              <div className="text-xs font-bold opacity-90 mb-3">{p.sub}</div>
              <p className="text-xs leading-relaxed opacity-85">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Program Tambahan */}
        <div className="bg-[#FAF8F4] border border-neutral-200/80 rounded-3xl p-6 sm:p-8">
          <h3 className="text-center font-bold text-lg text-rtq-green-900 mb-6 uppercase tracking-wider">
            Program Tambahan &amp; Pembiasaan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tambahan.map((t) => (
              <div
                key={t.title}
                className="bg-white p-4 rounded-2xl border border-neutral-200 flex items-center gap-3.5 shadow-sm hover:border-[#E8B54D] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#FDF6E2] text-rtq-green-900 flex items-center justify-center flex-shrink-0 shadow-xs">
                  {t.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-rtq-green-950">{t.title}</h4>
                  <p className="text-xs text-neutral-500 leading-snug">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   JADWAL & BIAYA PENDIDIKAN
──────────────────────────────────────────────────────── */
function JadwalBiayaSection() {
  const jadwal = [
    { hari: "Senin", waktu: "07:30 – 08:30", kegiatan: "Tahfidz Al-Qur'an", pengajar: "Ustadz Ahmad Fauzi" },
    { hari: "Selasa", waktu: "07:30 – 08:30", kegiatan: "Fiqh Dasar & Adab", pengajar: "Ustadzah Siti Aminah" },
    { hari: "Rabu", waktu: "08:30 – 09:30", kegiatan: "Bahasa Arab Dasar", pengajar: "Ustadz Yusuf" },
    { hari: "Kamis", waktu: "07:30 – 08:30", kegiatan: "Tahsin & Tajwid", pengajar: "Ustadzah Nur Aini" },
    { hari: "Jumat", waktu: "07:30 – 08:30", kegiatan: "Akhlak & Kisah Nabi", pengajar: "Ustadz Khalid" },
    { hari: "Sabtu", waktu: "08:00 – 09:30", kegiatan: "Ekstrakurikuler & Murajaah", pengajar: "Ustadz Bagus" },
  ];

  const biaya = [
    { name: "Pendaftaran & Assesment", sub: "1 kali saat awal", price: "Rp 200.000" },
    { name: "SPP Bulanan", sub: "per bulan", price: "Rp 150.000" },
    { name: "Seragam & Atribut", sub: "2 set pakaian santri", price: "Rp 350.000" },
    { name: "Buku Panduan & Mushaf", sub: "paket pembelajaran", price: "Rp 100.000" },
  ];

  return (
    <section id="jadwal" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF8F4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-rtq-green-100 text-rtq-green-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3">
            Informasi
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-rtq-green-900 mb-3">
            Jadwal &amp; Biaya Pendidikan
          </h2>
          <div className="w-16 h-1 bg-rtq-gold-400 rounded-full mx-auto mb-4" />
          <p className="text-sm sm:text-base text-neutral-600">
            Transparansi jadwal kegiatan mingguan dan rincian biaya pendidikan tahun ajaran 2026/2027.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Jadwal Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200">
            <h3 className="font-bold text-lg text-rtq-green-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <span>Jadwal Pembelajaran Mingguan</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="table w-full text-xs sm:text-sm">
                <thead>
                  <tr className="bg-rtq-green-900 text-rtq-gold-300">
                    <th className="rounded-l-xl py-3 px-3">Hari</th>
                    <th className="py-3 px-3">Waktu</th>
                    <th className="py-3 px-3">Materi</th>
                    <th className="rounded-r-xl py-3 px-3">Pengajar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  {jadwal.map((j) => (
                    <tr key={j.hari} className="hover:bg-neutral-50 transition">
                      <td className="font-bold text-rtq-green-900 py-3 px-3">{j.hari}</td>
                      <td className="py-3 px-3">{j.waktu}</td>
                      <td className="font-semibold py-3 px-3">{j.kegiatan}</td>
                      <td className="text-neutral-500 py-3 px-3">{j.pengajar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-neutral-500 mt-4 flex items-center gap-1.5">
              <svg className="w-4 h-4 fill-[#0c3624]" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <span>Waktu kegiatan dimulai pukul 07:30 WIB. Tersedia kelas pagi dan sore.</span>
            </p>
          </div>

          {/* Biaya Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200">
              <h3 className="font-bold text-lg text-rtq-green-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 fill-[#E8B54D]" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span>Rincian Biaya</span>
              </h3>
              <div className="space-y-3">
                {biaya.map((b) => (
                  <div key={b.name} className="flex justify-between items-center py-2 border-b border-dashed border-neutral-200">
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-rtq-green-950">{b.name}</div>
                      <div className="text-[11px] text-neutral-500">{b.sub}</div>
                    </div>
                    <div className="font-extrabold text-sm text-rtq-green-800">{b.price}</div>
                  </div>
                ))}
              </div>

              {/* Total Box */}
              <div className="mt-5 p-4 bg-rtq-green-900 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-rtq-gold-300 font-bold uppercase">Total Biaya Masuk</div>
                  <div className="text-[11px] text-white/70">Sudah termasuk pendaftaran &amp; seragam</div>
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-rtq-gold-300">
                  Rp 800.000
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-[#FAF4E6] border border-[#e8dfcf] rounded-3xl p-6">
              <h4 className="font-bold text-sm text-rtq-green-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <span>Pembayaran Tersedia:</span>
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Bank Syariah Indonesia (BSI), GoPay, OVO, Dana, serta Tunai langsung di kantor RTQ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   GALERI KEGIATAN (Matching Reference Screenshot)
──────────────────────────────────────────────────────── */
function GallerySection() {
  const categories = ["Semua", "Tahsin", "Tahfidz", "Adab", "Outdoor", "Muhadhoroh"];
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const allGalleries = [
    {
      id: 1,
      category: "Tahsin",
      title: "Tahsin • Kelas Anak Putra",
      topic: "Surat Al-Fatihah",
      date: "12 Oktober 2024",
      desc: "Dokumentasi kegiatan Tahsin untuk anak putra, fokus pada tajwid dan pelafalan Surat Al-Fatihah bersama Ustadz.",
      src: "/galeri-tahsin.jpg",
    },
    {
      id: 2,
      category: "Tahfidz",
      title: "Tahfidz • Kelas Hifdzil Quran",
      topic: "Juz 30 Muroja'ah",
      date: "10 Oktober 2024",
      desc: "Bimbingan hafalan Juz 30 dan muroja'ah berkala untuk memantapkan hafalan para santri.",
      src: "/hero-santri-exact.jpg",
    },
    {
      id: 3,
      category: "Adab",
      title: "Adab • Pembinaan Karakter",
      topic: "Santun di Kelas",
      date: "05 Oktober 2024",
      desc: "Pendidikan adab terhadap guru, Al-Qur'an, dan sesama santri sebelum memulai pembelajaran.",
      src: "/galeri-iqro.jpg",
    },
    {
      id: 4,
      category: "Tahfidz",
      title: "Tahfidz • Setoran Hafalan",
      topic: "Tahfidz Intensif Harian",
      date: "30 September 2024",
      desc: "Setoran hafalan baru one-on-one santri kepada Ustadz pengampu dengan talaqqi bersanad.",
      src: "/hero-santri.jpg",
    },
    {
      id: 5,
      category: "Tahsin",
      title: "Tahsin • Kelas Iqro 3",
      topic: "Makhraj Huruf",
      date: "28 September 2024",
      desc: "Latihan artikulasi pengucapan makharijul huruf hijaiyah dengan bimbingan teliti.",
      src: "/galeri-iqro.jpg",
    },
    {
      id: 6,
      category: "Outdoor",
      title: "Outdoor • Belajar di Kebun",
      topic: "Belajar di Kebun",
      date: "25 September 2024",
      desc: "Kegiatan tahfidz dan tadabbur alam di lingkungan terbuka yang asri dan sejuk.",
      src: "/news-featured.jpg",
    },
    {
      id: 7,
      category: "Tahfidz",
      title: "Tahfidz • Wisuda Juz 30",
      topic: "Wisuda Juz 30",
      date: "18 September 2024",
      desc: "Momen wisuda kelulusan tahfidz santri yang berhasil menuntaskan target hafalan.",
      src: "/galeri-wisuda.jpg",
    },
    {
      id: 8,
      category: "Muhadhoroh",
      title: "Muhadhoroh • Lomba Ceramah Anak",
      topic: "Lomba Pidato & Da'i Cilik",
      date: "15 September 2024",
      desc: "Ajang mengasah keberanian dan kemampuan dakwah santri cilik di hadapan umum.",
      src: "/galeri-ceramah.jpg",
    },
  ];

  const filtered =
    selectedCategory === "Semua"
      ? allGalleries
      : allGalleries.filter((item) => item.category === selectedCategory);

  const openModal = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeModal = () => {
    setActiveModalIndex(null);
  };

  const nextImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % filtered.length);
    }
  };

  const prevImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + filtered.length) % filtered.length);
    }
  };

  const currentItem = activeModalIndex !== null ? filtered[activeModalIndex] : null;

  return (
    <section id="galeri" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF8F4] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c3624] tracking-tight mb-2">
            Galeri Kegiatan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            Dokumentasi kegiatan belajar dan kegiatan santri RTQ Abdurrahman bin Auf
          </p>
        </div>

        {/* Filter Bar & Counter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#E8B54D] text-[#0c3624] shadow-xs"
                      : "bg-white text-[#0c3624] border border-[#0c3624]/40 hover:bg-neutral-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Info */}
          <div className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
            <span>Menampilkan {filtered.length} dari {allGalleries.length} kegiatan</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-[#0c3624] flex items-center gap-0.5">
              Diurutkan: Terbaru <span className="text-[10px]">∨</span>
            </span>
          </div>
        </div>

        {/* Gallery Cards Grid (4 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openModal(index)}
              className="group bg-white rounded-2xl overflow-hidden shadow-xs border border-neutral-200/80 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] sm:h-48 overflow-hidden bg-neutral-100 flex-shrink-0">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Meta */}
              <div className="p-3.5 flex flex-col items-center text-center">
                <h3 className="font-bold text-xs text-[#0c3624] leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-neutral-600 font-medium mt-0.5 line-clamp-1">
                  {item.topic}
                </p>
                <span className="text-[10px] text-neutral-400 mt-1">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal (Matching Mockup Screenshot) */}
      {currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg bg-[#0c3624] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button on Image */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white text-[#0c3624] font-bold flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-transform hover:scale-110 text-sm"
              aria-label="Tutup popup"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-[240px] sm:h-[280px] bg-black flex-shrink-0">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                sizes="600px"
                className="object-cover"
                priority
              />
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-5 bg-[#0c3624] text-white flex flex-col gap-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#F3CD67] leading-snug">
                  {currentItem.title} — {currentItem.topic}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mt-1">
                  {currentItem.date} • {currentItem.desc}
                </p>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                {/* Prev / Next & Counter */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevImage}
                      className="w-7 h-7 rounded-lg border border-white/40 text-white flex items-center justify-center text-xs hover:bg-white/10 transition"
                      aria-label="Foto sebelumnya"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="w-7 h-7 rounded-lg border border-white/40 text-white flex items-center justify-center text-xs hover:bg-white/10 transition"
                      aria-label="Foto selanjutnya"
                    >
                      →
                    </button>
                  </div>
                  <span className="text-xs text-white/90 font-semibold ml-2">
                    {(activeModalIndex ?? 0) + 1} / {filtered.length}
                  </span>
                </div>

                {/* Download & Share */}
                <div className="flex items-center gap-2">
                  <a
                    href={currentItem.src}
                    download
                    className="border border-white/40 hover:bg-white/10 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                  >
                    <span>↓</span> Download
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: currentItem.title,
                          text: currentItem.desc,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Tautan kegiatan berhasil disalin!");
                      }
                    }}
                    className="bg-[#E8B54D] hover:bg-[#d9a338] text-[#0c3624] font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition"
                  >
                    Bagikan
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   PENDAFTARAN SANTRI BARU (PPDB 2026/2027)
──────────────────────────────────────────────────────── */
function PendaftaranSection() {
  const [formData, setFormData] = useState({
    namaSantri: "",
    ttl: "",
    gender: "",
    usia: "",
    namaAyah: "",
    namaIbu: "",
    noWa: "",
    alamat: "",
    program: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin RTQ Abdurrahman bin Auf,%0A%0ASaya ingin mendaftarkan santri baru:%0A- Nama Santri: ${formData.namaSantri}%0A- TTL: ${formData.ttl}%0A- Gender: ${formData.gender}%0A- Usia: ${formData.usia} Tahun%0A- Nama Ayah: ${formData.namaAyah}%0A- Nama Ibu: ${formData.namaIbu}%0A- No WA Ortu: ${formData.noWa}%0A- Alamat: ${formData.alamat}%0A- Program Pilihan: ${formData.program}`;
    window.open(`https://wa.me/6285212185139?text=${text}`, "_blank");
  };

  const requirements = [
    "Usia 6–12 tahun, siap mengikuti pendidikan dasar Islam",
    "Mampu membaca Al-Qur'an dasar / Iqra jilid 3",
    "Melampirkan fotokopi Akte Kelahiran & Kartu Keluarga",
    "Surat keterangan sehat dari dokter/puskesmas",
  ];

  const steps = [
    {
      num: 1,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      title: "Daftar Online",
      desc: "Isi formulir pendaftaran",
    },
    {
      num: 2,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Verifikasi Dokumen",
      desc: "Petugas verifikasi berkas",
    },
    {
      num: 3,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
      ),
      title: "Ujian & Wawancara",
      desc: "Tes baca Al-Qur'an & wawancara",
    },
    {
      num: 4,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      ),
      title: "Pengumuman & Daftar Ulang",
      desc: "Hasil & pembayaran daftar ulang",
    },
  ];

  return (
    <section
      id="pendaftaran"
      className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF8F4] relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Informasi & 4 Langkah Pendaftaran */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Pill Badge */}
            <div className="mb-3">
              <span className="bg-[#E8B54D] text-[#0c3624] font-black text-xs px-4 py-1.5 rounded-full inline-block uppercase tracking-wider shadow-xs">
                PENDAFTARAN DIBUKA
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c3624] tracking-tight mb-2">
              Penerimaan Peserta Didik Baru
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mb-8">
              Tahun Ajaran 2026/2027 • RTQ Abdurrahman bin Auf
            </p>

            {/* Persyaratan Pendaftaran */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-[#0c3624] mb-3">
                Persyaratan Pendaftaran:
              </h3>
              <ul className="space-y-2.5">
                {requirements.map((req) => (
                  <li key={req} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#E8B54D] text-[#0c3624] flex items-center justify-center font-black text-xs flex-shrink-0 shadow-xs">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4 Langkah Pendaftaran */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0c3624] mb-6">
                4 Langkah Pendaftaran:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
                {steps.map((s) => (
                  <div
                    key={s.num}
                    className="relative bg-white border border-neutral-200/80 rounded-2xl p-3.5 pt-5 flex flex-col items-center text-center shadow-xs"
                  >
                    {/* Number Badge on top */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8B54D] text-[#0c3624] font-black text-xs flex items-center justify-center shadow-xs">
                      {s.num}
                    </div>

                    <div className="text-2xl mb-1.5 mt-1">{s.icon}</div>
                    <h4 className="font-bold text-xs text-[#0c3624] leading-tight mb-1">
                      {s.title}
                    </h4>
                    <p className="text-[10px] text-neutral-500 leading-tight">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Formulir Pendaftaran Online + Kontak Kami Box */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Form Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-neutral-200/80">
              {/* Header inside Form Card */}
              <div className="bg-[#0c3624] text-white py-3 px-4 rounded-2xl flex items-center justify-between mb-4">
                <span className="font-bold text-sm sm:text-base">
                  Formulir Pendaftaran Online
                </span>
                <svg className="w-5 h-5 fill-[#E8B54D]" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Nama Santri */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Nama Santri
                  </label>
                  <input
                    type="text"
                    name="namaSantri"
                    required
                    placeholder="Masukkan nama lengkap santri"
                    value={formData.namaSantri}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                {/* TTL */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Tempat, Tanggal Lahir (TTL)
                  </label>
                  <input
                    type="text"
                    name="ttl"
                    required
                    placeholder="Contoh: Banyuwangi, 12 Januari 2015"
                    value={formData.ttl}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition text-neutral-700"
                  >
                    <option value="">Pilih Gender ∨</option>
                    <option value="Laki-laki (Putra)">Laki-laki (Putra)</option>
                    <option value="Perempuan (Putri)">Perempuan (Putri)</option>
                  </select>
                </div>

                {/* Usia */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Usia (Tahun)
                  </label>
                  <input
                    type="number"
                    name="usia"
                    required
                    placeholder="Contoh: 9"
                    value={formData.usia}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                {/* Nama Ayah */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    name="namaAyah"
                    required
                    placeholder="Masukkan nama ayah/wali"
                    value={formData.namaAyah}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                {/* Nama Ibu */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    name="namaIbu"
                    required
                    placeholder="Masukkan nama ibu/wali"
                    value={formData.namaIbu}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                {/* No WhatsApp */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Nomor WhatsApp Orang Tua
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="tel"
                      name="noWa"
                      required
                      placeholder="08xx-xxxx-xxxx"
                      value={formData.noWa}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition pr-10"
                    />
                    <svg className="w-4 h-4 fill-[#25D366] absolute right-3" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                    </svg>
                  </div>
                </div>

                {/* Alamat Lengkap */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Alamat Lengkap
                  </label>
                  <input
                    type="text"
                    name="alamat"
                    required
                    placeholder="Masukkan alamat lengkap"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                {/* Program Pilihan */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Program Pilihan
                  </label>
                  <select
                    name="program"
                    required
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition text-neutral-700"
                  >
                    <option value="">Pilih Program ∨</option>
                    <option value="Tahfidz Al-Qur'an">Tahfidz</option>
                    <option value="Tahsin & Tajwid">Tahsin</option>
                    <option value="Reguler / BTQ">Reguler</option>
                  </select>
                  <p className="text-[10px] text-neutral-400 text-center mt-1">
                    Tahfidz • Tahsin • Reguler
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E8B54D] hover:bg-[#d9a338] text-[#0c3624] font-black text-sm rounded-xl uppercase tracking-wider shadow-md transition transform hover:-translate-y-0.5 mt-2 text-center"
                >
                  KIRIM PENDAFTARAN
                </button>
              </form>
            </div>

            {/* Kontak Kami Yellow/Gold Box */}
            <div className="bg-[#E8B54D] rounded-2xl p-4 sm:p-5 text-[#0c3624] shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>Kontak Kami</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <svg className="w-4 h-4 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                </svg>
                <span>WhatsApp: </span>
                <a
                  href="https://wa.me/6285212185139"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  0852-1218-5139
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold flex-wrap">
                <svg className="w-4 h-4 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>Email: </span>
                <a href="mailto:rtqaba@gmail.com" className="hover:underline">
                  rtqaba@gmail.com
                </a>
                <span>/</span>
                <a
                  href="mailto:kesejahteraanumat01@gmail.com"
                  className="hover:underline"
                >
                  kesejahteraanumat01@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-[11px] font-semibold leading-snug">
                <svg className="w-4 h-4 fill-[#0c3624] flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>
                  Jl. Raya Banyuwangi No 315 RT 002 RW 006 Dusun Krajan II
                  Kembiritan, Genteng Banyuwangi, Jawa Timur
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   KONTAK KAMI & MEDIA SOSIAL (Matching Reference Screenshot)
──────────────────────────────────────────────────────── */
function ContactSection() {
  const [msgForm, setMsgForm] = useState({
    nama: "",
    noWa: "",
    email: "",
    pesan: "",
  });

  const handleMsgChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMsgForm({ ...msgForm, [e.target.name]: e.target.value });
  };

  const handleMsgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin RTQ ABA,%0A%0ASaya ingin mengirim pesan:%0A- Nama: ${msgForm.nama}%0A- No WA: ${msgForm.noWa}%0A- Email: ${msgForm.email}%0A- Pesan: ${msgForm.pesan}`;
    window.open(`https://wa.me/6285212185139?text=${text}`, "_blank");
  };

  const socials = [
    {
      name: "Instagram",
      handle: "@rtq_abdurrahman.bin.auf",
      sub: "Follow untuk info & kegiatan harian",
      url: "https://www.instagram.com/rtq_abdurrahman.bin.auf?stkn=MWF4eHVlMWEwejI4ZA==",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      handle: "RTQ ABA Official",
      sub: "Kajian & tilawah terbaru",
      url: "https://youtube.com/@rtqaba?si=44HZXzRYXZkE945Z",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "RTQ Islamic School",
      sub: "Komunitas & pengumuman",
      url: "https://www.facebook.com/share/19WhBPAtBU/",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="kontak" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FAF8F4] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="mb-2">
            <span className="bg-[#E8B54D] text-[#0c3624] font-black text-xs px-4 py-1.5 rounded-full inline-block uppercase tracking-wider shadow-xs">
              HUBUNGI KAMI
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0c3624] tracking-tight mb-3">
            Kontak Kami
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            Kami siap membantu Anda. Hubungi RTQ untuk informasi pendaftaran, program, atau pertanyaan seputar pembelajaran Al-Qur&apos;an.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Informasi Kontak Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <h3 className="font-black text-2xl text-[#0c3624] mb-6">
                Informasi Kontak
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Alamat */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0c3624] text-[#E8B54D] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-[#E8B54D]" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0c3624]">
                      Alamat:
                    </h4>
                    <p className="text-neutral-600 text-xs leading-relaxed mt-0.5">
                      Jl. Raya Banyuwangi No 315 RT 002 RW 006 Dusun Krajan II Kembiritan, Genteng Banyuwangi, Jawa Timur 68465
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0c3624] text-[#E8B54D] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0c3624]">
                      WhatsApp:
                    </h4>
                    <a
                      href="https://wa.me/6285212185139"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 font-semibold hover:text-[#0c3624] hover:underline text-xs block mt-0.5"
                    >
                      +62 852-1218-5139
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0c3624] text-[#E8B54D] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-[#E8B54D]" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0c3624]">
                      Email:
                    </h4>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <a
                        href="mailto:rtqaba@gmail.com"
                        className="text-neutral-700 hover:text-[#0c3624] hover:underline text-xs"
                      >
                        rtqaba@gmail.com
                      </a>
                      <a
                        href="mailto:kesejahteraanumat01@gmail.com"
                        className="text-neutral-700 hover:text-[#0c3624] hover:underline text-xs"
                      >
                        kesejahteraanumat01@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0c3624] text-[#E8B54D] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-[#E8B54D]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0c3624]">
                      Instagram:
                    </h4>
                    <a
                      href="https://www.instagram.com/rtq_abdurrahman.bin.auf?stkn=MWF4eHVlMWEwejI4ZA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 hover:text-[#0c3624] hover:underline text-xs block mt-0.5"
                    >
                      @rtq_abdurrahman.bin.auf
                    </a>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0c3624] text-[#E8B54D] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-[#E8B54D]" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0c3624]">
                      Jam Operasional:
                    </h4>
                    <p className="text-neutral-600 text-xs leading-relaxed mt-0.5">
                      Senin – Jumat: 08.00 – 16.00 WIB<br />
                      Sabtu: 08.00 – 12.00 WIB<br />
                      Minggu &amp; Hari Libur: Tutup
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Quote Card inside Left Card */}
            <div className="bg-[#E8B54D] rounded-2xl p-4 text-[#0c3624] text-center mt-6 shadow-xs relative">
              <span className="text-2xl font-serif font-black block leading-none mb-1 opacity-80">
                “
              </span>
              <p className="font-bold text-xs sm:text-sm text-[#0c3624] leading-snug">
                Bersama Al-Qur&apos;an Kita Raih Masa Depan
              </p>
              <span className="text-[10px] font-semibold text-[#0c3624]/80 block mt-1">
                — RTQ Islamic Quran School —
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Kirim Pesan + Lokasi Kami + Media Sosial */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* 1. Kirim Pesan Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-neutral-200/80">
              <h3 className="font-black text-xl text-[#0c3624] mb-4">
                Kirim Pesan
              </h3>

              <form onSubmit={handleMsgSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama"
                      required
                      placeholder="Masukkan nama Anda"
                      value={msgForm.nama}
                      onChange={handleMsgChange}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="noWa"
                      required
                      placeholder="+62 8xx xxxx xxxx"
                      value={msgForm.noWa}
                      onChange={handleMsgChange}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nama@email.com"
                    value={msgForm.email}
                    onChange={handleMsgChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0c3624] mb-1">
                    Pesan
                  </label>
                  <textarea
                    name="pesan"
                    required
                    rows={3}
                    placeholder="Tulis pesan Anda di sini..."
                    value={msgForm.pesan}
                    onChange={handleMsgChange}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#F8F9FA] border border-neutral-200 focus:border-[#0c3624] focus:outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E8B54D] hover:bg-[#d9a338] text-[#0c3624] font-black text-xs sm:text-sm rounded-xl uppercase tracking-wider shadow-sm transition flex items-center justify-center gap-2 mt-2"
                >
                  <span>Kirim Pesan</span>
                  <span>✈</span>
                </button>
              </form>
            </div>

            {/* 2. Lokasi Kami (Interactive Map) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-neutral-200/80">
              <h3 className="font-black text-lg text-[#0c3624] mb-3 text-center">
                Lokasi Kami
              </h3>

              {/* Map Preview with Pin */}
              <div className="relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden border border-neutral-200 shadow-inner group">
                <iframe
                  title="Peta Lokasi RTQ Abdurrahman bin Auf"
                  src="https://maps.google.com/maps?q=Kembiritan,+Genteng,+Banyuwangi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  allowFullScreen
                />
                <a
                  href="https://maps.google.com/?q=Jl.+Raya+Banyuwangi+No+315+RT+002+RW+006+Dusun+Krajan+II+Kembiritan+Genteng+Banyuwangi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 bg-[#0c3624] text-white hover:bg-[#E8B54D] hover:text-[#0c3624] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md transition flex items-center gap-1"
                >
                  <span>Buka di Google Maps</span> ↗
                </a>
              </div>
            </div>

            {/* 3. Media Sosial Kami */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-neutral-200/80">
              <h3 className="font-black text-lg text-[#0c3624] mb-3 text-center">
                Media Sosial Kami
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#FAF8F4] border border-neutral-200/80 rounded-2xl flex flex-col items-center text-center hover:border-[#E8B54D] hover:bg-[#FDF6E2] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0c3624] text-[#E8B54D] flex items-center justify-center text-sm mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                      {s.icon}
                    </div>
                    <h4 className="font-bold text-xs text-[#0c3624]">
                      {s.name}
                    </h4>
                    <p className="text-[10px] font-semibold text-neutral-700 mt-0.5 truncate max-w-full">
                      {s.handle}
                    </p>
                    <span className="text-[9px] text-neutral-400 mt-0.5 leading-tight">
                      {s.sub}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   FOOTER (Matching Official Icons & Colors)
──────────────────────────────────────────────────────── */
function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#082217] text-white pt-14 pb-8 px-4 sm:px-6 border-t-4 border-[#E8B54D]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-official.png"
                alt="Logo RTQ ABA"
                width={50}
                height={50}
                className="rounded-full bg-white p-0.5 border border-[#E8B54D]/50"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-[#F3CD67] leading-tight">
                  RTQ ABDURRAHMAN
                </span>
                <span className="font-bold text-xs text-white tracking-wider">
                  BIN AUF
                </span>
              </div>
            </div>
            <p className="text-xs text-white/75 leading-relaxed mt-1">
              Mencetak generasi Qur&apos;ani yang berakhlak mulia, berilmu, dan mandiri berlandaskan Al-Qur&apos;an dan Sunnah.
            </p>
            
            {/* Social Icons with Crisp SVGs */}
            <div className="flex items-center gap-2.5 mt-2">
              <a
                href="https://www.instagram.com/rtq_abdurrahman.bin.auf?stkn=MWF4eHVlMWEwejI4ZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8B54D] hover:text-[#0c3624] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram RTQ"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://youtube.com/@rtqaba?si=44HZXzRYXZkE945Z"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8B54D] hover:text-[#0c3624] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube RTQ"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/19WhBPAtBU/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8B54D] hover:text-[#0c3624] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook RTQ"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://wa.me/6285212185139"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E8B54D] hover:text-[#0c3624] text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="WhatsApp RTQ"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.771.79 2.796.791h.005c3.18 0 5.767-2.586 5.767-5.766.001-3.187-2.575-5.77-5.772-5.771zm3.374 8.232c-.144.405-.837.774-1.17.824-.312.045-.634.075-1.026.075-1.42 0-2.85-.758-3.791-1.7-.94-.94-1.7-2.37-1.7-3.79 0-.392.03-.714.075-1.026.05-.333.419-1.026.824-1.17.405-.144.757.067.892.405l.593 1.48c.135.337.045.697-.18 1.034l-.36.54c.315.54.765.99 1.305 1.305l.54-.36c.337-.225.697-.315 1.034-.18l1.48.593c.338.135.549.487.405.892z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-bold text-sm text-[#F3CD67] uppercase tracking-wider mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => scrollTo("beranda")}
                  className="hover:text-[#F3CD67] transition flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-[#E8B54D]">›</span> Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("profil")}
                  className="hover:text-[#F3CD67] transition flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-[#E8B54D]">›</span> Profil Lembaga
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("program")}
                  className="hover:text-[#F3CD67] transition flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-[#E8B54D]">›</span> Program Pendidikan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("jadwal")}
                  className="hover:text-[#F3CD67] transition flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-[#E8B54D]">›</span> Jadwal &amp; Biaya
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("galeri")}
                  className="hover:text-[#F3CD67] transition flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-[#E8B54D]">›</span> Galeri Santri
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("pendaftaran")}
                  className="hover:text-[#F3CD67] transition flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-[#E8B54D]">›</span> Pendaftaran PPDB
                </button>
              </li>
            </ul>
          </div>

          {/* Program */}
          <div>
            <h4 className="font-bold text-sm text-[#F3CD67] uppercase tracking-wider mb-4">
              Program Unggulan
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#E8B54D]">✔</span> Tahfidz Al-Qur&apos;an 30 Juz
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#E8B54D]">✔</span> Tahsin &amp; Makharijul Huruf
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#E8B54D]">✔</span> Murajaah Terjadwal
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#E8B54D]">✔</span> Baca Tulis Al-Qur&apos;an (BTQ)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#E8B54D]">✔</span> Adab &amp; Karakter Islami
              </li>
            </ul>
          </div>

          {/* Kontak & Alamat */}
          <div>
            <h4 className="font-bold text-sm text-[#F3CD67] uppercase tracking-wider mb-4">
              Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs text-white/80 leading-relaxed">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 fill-[#E8B54D] flex-shrink-0 mt-0.5" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Jl. Raya Banyuwangi No 315 RT 002 RW 006 Dusun Krajan II Kembiritan, Genteng Banyuwangi, Jawa Timur 68465</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-[#25D366] flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                </svg>
                <a
                  href="https://wa.me/6285212185139"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3CD67] transition font-medium"
                >
                  0852-1218-5139
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-[#E8B54D] flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a
                  href="mailto:rtqaba@gmail.com"
                  className="hover:text-[#F3CD67] transition font-medium"
                >
                  rtqaba@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-[#E8B54D] flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.89 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a
                  href="mailto:kesejahteraanumat01@gmail.com"
                  className="hover:text-[#F3CD67] transition font-medium"
                >
                  kesejahteraanumat01@gmail.com
                </a>
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 text-center text-xs text-white/60">
          <p>© 2026 <strong>RTQ Abdurrahman bin Auf</strong>. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────────────
   FLOATING WHATSAPP & BACK TO TOP (Matching Green Circle Icon)
──────────────────────────────────────────────────────── */
function FloatingElements() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Action Button (Green Circle with WhatsApp / Chat Icon) */}
      <div className="fixed bottom-5 left-5 z-40">
        <a
          href="https://wa.me/6285212185139"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/80 group"
          aria-label="Chat WhatsApp Admin RTQ"
        >
          {/* Crisp WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-white transform group-hover:scale-105 transition-transform"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>

      {/* Back to top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-[#E8B54D] hover:bg-[#d9a338] text-[#0c3624] font-black flex items-center justify-center text-lg shadow-xl transition-all duration-300 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Kembali ke atas"
      >
        ↑
      </button>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#2D2D2D]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <StrukturOrganisasiSection />
        <ProgramsSection />
        <JadwalBiayaSection />
        <GallerySection />
        <PendaftaranSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
