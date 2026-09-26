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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    profil: false,
    program: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isProfilActive = activeSection === "profil" || activeSection === "struktur";
  const isProgramActive = activeSection === "program" || activeSection === "jadwal" || activeSection === "brosur";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
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

          {/* Desktop Nav Links (Streamlined 5 Key Items) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. Beranda */}
            <button
              onClick={() => scrollTo("beranda")}
              className={`relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activeSection === "beranda"
                  ? "text-rtq-green-900 font-bold"
                  : "text-neutral-600 hover:text-rtq-green-800"
              }`}
            >
              Beranda
              {activeSection === "beranda" && (
                <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-rtq-gold-500 rounded-full" />
              )}
            </button>

            {/* 2. Profil (Dropdown: Tentang RTQ & Struktur Organisasi) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("profil")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => scrollTo("profil")}
                className={`relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                  isProfilActive
                    ? "text-rtq-green-900 font-bold"
                    : "text-neutral-600 hover:text-rtq-green-800"
                }`}
              >
                <span>Profil</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === "profil" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
                {isProfilActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-rtq-gold-500 rounded-full" />
                )}
              </button>

              {/* Dropdown Menu */}
              {openDropdown === "profil" && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-fadeIn">
                  <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 text-left">
                    <button
                      onClick={() => scrollTo("profil")}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF4E6] transition-colors text-left group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c3624] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#DEAB3E] group-hover:text-white transition-colors">
                        🏛️
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0c3624] group-hover:text-[#916b1b]">
                          Tentang RTQ ABA
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Visi, misi, profil &amp; fasilitas
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => scrollTo("struktur")}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF4E6] transition-colors text-left group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c3624] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#DEAB3E] group-hover:text-white transition-colors">
                        👥
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0c3624] group-hover:text-[#916b1b]">
                          Struktur Organisasi
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Bagan kepengurusan &amp; asatidzah
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Program & Biaya (Dropdown: Program, Biaya, Brosur) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("program")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => scrollTo("program")}
                className={`relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                  isProgramActive
                    ? "text-rtq-green-900 font-bold"
                    : "text-neutral-600 hover:text-rtq-green-800"
                }`}
              >
                <span>Program &amp; Biaya</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === "program" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
                {isProgramActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-rtq-gold-500 rounded-full" />
                )}
              </button>

              {/* Dropdown Menu */}
              {openDropdown === "program" && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50 animate-fadeIn">
                  <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 text-left">
                    <button
                      onClick={() => scrollTo("program")}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF4E6] transition-colors text-left group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c3624] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#DEAB3E] group-hover:text-white transition-colors">
                        📖
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0c3624] group-hover:text-[#916b1b]">
                          Program Unggulan
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Tahfidz &amp; Kesetaraan SD/MI
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => scrollTo("jadwal")}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF4E6] transition-colors text-left group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c3624] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#DEAB3E] group-hover:text-white transition-colors">
                        💰
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0c3624] group-hover:text-[#916b1b]">
                          Jadwal &amp; Biaya Pendidikan
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Rincian infaq, SPP &amp; alur masuk
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => scrollTo("brosur")}
                      className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF4E6] transition-colors text-left group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0c3624] flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-[#DEAB3E] group-hover:text-white transition-colors">
                        📄
                      </span>
                      <div>
                        <div className="text-xs font-bold text-[#0c3624] group-hover:text-[#916b1b] flex items-center gap-1.5">
                          <span>Brosur Resmi SPMB</span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-100 text-amber-800 font-bold">
                            Baru
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Poster &amp; liflet resolusi penuh
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Galeri */}
            <button
              onClick={() => scrollTo("galeri")}
              className={`relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activeSection === "galeri"
                  ? "text-rtq-green-900 font-bold"
                  : "text-neutral-600 hover:text-rtq-green-800"
              }`}
            >
              Galeri
              {activeSection === "galeri" && (
                <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-rtq-gold-500 rounded-full" />
              )}
            </button>

            {/* 5. Kontak */}
            <button
              onClick={() => scrollTo("kontak")}
              className={`relative px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                activeSection === "kontak"
                  ? "text-rtq-green-900 font-bold"
                  : "text-neutral-600 hover:text-rtq-green-800"
              }`}
            >
              Kontak
              {activeSection === "kontak" && (
                <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-rtq-gold-500 rounded-full" />
              )}
            </button>
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
          className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-rtq-green-950 text-white p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out overflow-y-auto ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
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

            {/* Mobile Nav Links Grouped Accordion */}
            <div className="flex flex-col gap-1.5 mt-5">
              {/* Beranda */}
              <button
                onClick={() => scrollTo("beranda")}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeSection === "beranda"
                    ? "bg-rtq-gold-400 text-rtq-green-950 font-bold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                Beranda
              </button>

              {/* Profil Group */}
              <div className="rounded-xl overflow-hidden bg-white/5">
                <button
                  onClick={() => setMobileExpanded(prev => ({ ...prev, profil: !prev.profil }))}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>🏛️</span>
                    <span>Profil Lembaga</span>
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 text-white/60 ${
                      mobileExpanded.profil ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileExpanded.profil && (
                  <div className="pl-6 pr-3 pb-2 pt-1 flex flex-col gap-1 border-t border-white/5">
                    <button
                      onClick={() => scrollTo("profil")}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                        activeSection === "profil" ? "text-rtq-gold-300 font-bold" : "text-white/70 hover:text-white"
                      }`}
                    >
                      • Tentang RTQ ABA
                    </button>
                    <button
                      onClick={() => scrollTo("struktur")}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                        activeSection === "struktur" ? "text-rtq-gold-300 font-bold" : "text-white/70 hover:text-white"
                      }`}
                    >
                      • Struktur Organisasi
                    </button>
                  </div>
                )}
              </div>

              {/* Program & Biaya Group */}
              <div className="rounded-xl overflow-hidden bg-white/5">
                <button
                  onClick={() => setMobileExpanded(prev => ({ ...prev, program: !prev.program }))}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>📖</span>
                    <span>Program &amp; Biaya</span>
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 text-white/60 ${
                      mobileExpanded.program ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileExpanded.program && (
                  <div className="pl-6 pr-3 pb-2 pt-1 flex flex-col gap-1 border-t border-white/5">
                    <button
                      onClick={() => scrollTo("program")}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                        activeSection === "program" ? "text-rtq-gold-300 font-bold" : "text-white/70 hover:text-white"
                      }`}
                    >
                      • Program Unggulan
                    </button>
                    <button
                      onClick={() => scrollTo("jadwal")}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                        activeSection === "jadwal" ? "text-rtq-gold-300 font-bold" : "text-white/70 hover:text-white"
                      }`}
                    >
                      • Jadwal &amp; Biaya Pendidikan
                    </button>
                    <button
                      onClick={() => scrollTo("brosur")}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                        activeSection === "brosur" ? "text-rtq-gold-300 font-bold" : "text-white/70 hover:text-white"
                      }`}
                    >
                      <span>• Brosur Resmi SPMB</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-400 text-neutral-950 font-bold">
                        Baru
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Galeri */}
              <button
                onClick={() => scrollTo("galeri")}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeSection === "galeri"
                    ? "bg-rtq-gold-400 text-rtq-green-950 font-bold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                Galeri Kegiatan
              </button>

              {/* Kontak */}
              <button
                onClick={() => scrollTo("kontak")}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeSection === "kontak"
                    ? "bg-rtq-gold-400 text-rtq-green-950 font-bold"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                Kontak &amp; Lokasi
              </button>
            </div>
          </div>

          <div className="pt-5 border-t border-white/10 mt-6">
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
interface TupItem {
  role: string;
  title: string;
  name?: string;
  summary: string;
  tugas: string[];
  fungsi: string[];
  note?: string;
}

const STRUKTUR_TUP: Record<string, TupItem> = {
  "Pembina": {
    "role": "Garis Yayasan · YASKUB",
    "title": "Pembina",
    "summary": "Organ tertinggi yayasan yang memegang kewenangan yang tidak diserahkan kepada Pengurus maupun Pengawas (sesuai UU Yayasan & AD/ART).",
    "tugas": [
      "Menetapkan dan mengubah Anggaran Dasar yayasan.",
      "Mengangkat dan memberhentikan anggota Pengurus serta Pengawas berdasarkan mekanisme AD/ART.",
      "Menetapkan kebijakan umum yayasan sebagai acuan Pengurus dalam menjalankan kepengurusan.",
      "Mengesahkan program kerja dan rancangan anggaran pendapatan & belanja tahunan.",
      "Mengesahkan laporan tahunan yayasan yang disusun oleh Pengurus.",
      "Memutuskan penggabungan, perubahan bentuk, atau pembubaran yayasan sesuai ketentuan hukum.",
      "Memberikan arahan strategis jangka panjang atas visi dan marwah dakwah lembaga.",
      "Menjadi rujukan tertinggi dalam penyelesaian perselisihan internal antar organ yayasan."
    ],
    "fungsi": [
      "Pemegang kewenangan tertinggi yayasan.",
      "Penentu arah dan kebijakan umum kelembagaan.",
      "Pengangkat & pemberhentian Pengurus/Pengawas.",
      "Penjaga marwah visi-misi dan nilai dakwah yayasan.",
      "Pemutus perkara strategis/legal yang tidak dilimpahkan ke Pengurus."
    ]
  },
  "Ketua": {
    "role": "Garis Yayasan · YASKUB",
    "title": "Ketua",
    "summary": "Pemegang kebijakan tertinggi yayasan dan penanggung jawab arah strategis seluruh unit (RTQ & SDIT).",
    "tugas": [
      "Menetapkan visi, misi, dan kebijakan strategis yayasan untuk seluruh unit.",
      "Mengesahkan program kerja dan anggaran tahunan tiap unit (RTQ & SDIT).",
      "Mengangkat serta memberhentikan pengurus, kepala unit, dan pejabat struktural lain.",
      "Menjalin dan memelihara kerja sama strategis dengan mitra, pemerintah, dan donatur.",
      "Mewakili yayasan dalam urusan hukum, kelembagaan, dan hubungan eksternal.",
      "Mengawasi pencapaian target lembaga secara menyeluruh lintas unit.",
      "Memimpin rapat koordinasi pengurus yayasan secara berkala.",
      "Menyetujui pengeluaran dan kebijakan strategis di atas kewenangan kepala unit.",
      "Menjaga arah pengembangan lembaga tetap selaras dengan visi dakwah pendidikan Qur'ani."
    ],
    "fungsi": [
      "Kepemimpinan strategis lembaga.",
      "Pengambilan keputusan tertinggi tingkat yayasan.",
      "Representasi kelembagaan ke pihak luar.",
      "Pengawasan lintas unit (RTQ & SDIT).",
      "Pembina hubungan kemitraan & donatur strategis."
    ]
  },
  "Sekretaris": {
    "role": "Garis Yayasan · YASKUB",
    "title": "Sekretaris",
    "summary": "Penanggung jawab administrasi, dokumentasi, dan kesekretariatan yayasan.",
    "tugas": [
      "Mengelola surat-menyurat masuk dan keluar serta arsip yayasan secara tertib.",
      "Menyusun notulen rapat pengurus dan dokumen legal kelembagaan.",
      "Menyiapkan SK, MoU, dan dokumen administratif lain atas persetujuan Ketua.",
      "Mengoordinasikan agenda, undangan, dan jadwal kegiatan yayasan.",
      "Menjaga kelengkapan dan pembaruan dokumen perizinan tiap unit (izin operasional, akta, dsb).",
      "Mendokumentasikan kegiatan dan keputusan penting yayasan sebagai arsip kelembagaan.",
      "Menjadi penghubung administratif antara Pembina, Pengurus, dan Pengawas."
    ],
    "fungsi": [
      "Administrasi kelembagaan.",
      "Dokumentasi dan kearsipan.",
      "Koordinasi internal pengurus.",
      "Penjaga legalitas & kelengkapan dokumen yayasan."
    ]
  },
  "Bendahara": {
    "role": "Garis Yayasan · YASKUB",
    "title": "Bendahara",
    "summary": "Penanggung jawab pengelolaan keuangan yayasan dan konsolidasi keuangan seluruh unit.",
    "tugas": [
      "Menyusun dan mengelola anggaran (RAPB) yayasan bersama pengurus tiap unit.",
      "Mencatat serta mengontrol pemasukan dan pengeluaran kas yayasan secara berkala.",
      "Menerima dan mengonsolidasikan laporan keuangan unit (RTQ & SDIT) setiap bulan.",
      "Menyusun laporan keuangan, neraca, dan arus kas secara periodik untuk Pembina/Ketua.",
      "Mengelola penggalangan dana serta pertanggungjawaban dana donatur secara transparan.",
      "Melakukan verifikasi dan audit internal sederhana atas pembukuan tiap unit.",
      "Menetapkan mekanisme dan alur persetujuan pengeluaran keuangan lembaga.",
      "Menyimpan bukti transaksi dan dokumen pendukung keuangan sesuai standar akuntabilitas."
    ],
    "fungsi": [
      "Pengelolaan keuangan lembaga.",
      "Kontrol anggaran dan arus kas.",
      "Penjaminan akuntabilitas dana.",
      "Konsolidator laporan keuangan lintas unit.",
      "Pengelola dana donatur & CSR."
    ]
  },
  "Pengawas": {
    "role": "Garis Yayasan · YASKUB",
    "title": "Pengawas",
    "summary": "Pengawas independen yang memastikan pengurus menjalankan amanah sesuai AD/ART dan aturan.",
    "tugas": [
      "Mengawasi kinerja pengurus dan kepatuhan pelaksanaan program terhadap AD/ART.",
      "Memeriksa laporan keuangan dan program kerja unit secara berkala.",
      "Memberikan nasihat, teguran, dan rekomendasi perbaikan kepada pengurus.",
      "Mengaudit pelaksanaan kebijakan yayasan dan efektivitas program.",
      "Melaporkan hasil pengawasan kepada Pembina sebagai bahan evaluasi.",
      "Memastikan tidak terjadi penyimpangan penggunaan aset dan dana yayasan.",
      "Menelaah pengaduan atau permasalahan internal terkait tata kelola lembaga."
    ],
    "fungsi": [
      "Pengawasan kelembagaan.",
      "Audit internal.",
      "Penjaga akuntabilitas pengurus.",
      "Pemberi rekomendasi perbaikan tata kelola."
    ]
  },
  "Mudir / Kepala RTQ": {
    "role": "Pimpinan Operasional",
    "title": "Mudir / Kepala RTQ",
    "summary": "Pemimpin operasional tertinggi RTQ; penanggung jawab seluruh program tahfidz dan mutu lembaga sehari-hari.",
    "tugas": [
      "Memimpin dan mengoordinasikan seluruh kegiatan operasional RTQ lintas bidang.",
      "Menerjemahkan kebijakan yayasan menjadi program kerja dan target tahunan RTQ.",
      "Menetapkan target hafalan, standar mutu tahfidz, dan indikator keberhasilan santri.",
      "Membina, mengarahkan, dan menilai kinerja seluruh kepala bidang, koordinator, dan ustadz.",
      "Menyusun dan menyampaikan laporan berkala (bulanan/semester) kepada Ketua Yayasan.",
      "Menjaga kedisiplinan, akhlak, dan budaya Qur'ani di lingkungan lembaga.",
      "Memimpin rapat koordinasi bidang secara rutin untuk sinkronisasi program.",
      "Mengambil keputusan operasional harian yang tidak memerlukan eskalasi ke yayasan.",
      "Menjadi representasi RTQ dalam kegiatan resmi dan hubungan dengan wali santri."
    ],
    "fungsi": [
      "Kepemimpinan operasional harian.",
      "Penjaminan mutu program tahfidz.",
      "Pembinaan dan penilaian SDM.",
      "Sinkronisasi program antar bidang.",
      "Pelapor kinerja RTQ ke yayasan."
    ]
  },
  "Akademik & Tahfidz": {
    "role": "Bidang",
    "title": "Akademik & Tahfidz",
    "summary": "Penanggung jawab kurikulum, target hafalan, dan mutu pembelajaran tahfidz.",
    "tugas": [
      "Menyusun kurikulum, silabus, dan target hafalan per marhalah (jenjang).",
      "Menetapkan metode talaqqi, setoran (ziyadah), dan muroja'ah yang digunakan.",
      "Mengatur kalender akademik dan jadwal pembelajaran tahfidz & mapel umum.",
      "Menyelenggarakan evaluasi/ujian tahfidz dan tasmi' secara berkala.",
      "Membina dan meningkatkan mutu muhaffizh serta pengampu mata pelajaran.",
      "Mencatat, mengolah, dan mengevaluasi capaian hafalan santri secara sistematis.",
      "Mengoordinasikan Koordinator Halaqah dan Koordinator Kurikulum dalam pelaksanaan harian.",
      "Melaporkan capaian akademik & tahfidz kepada Mudir secara berkala."
    ],
    "fungsi": [
      "Pengembangan kurikulum dan metode.",
      "Penjaminan mutu akademik.",
      "Evaluasi capaian hafalan.",
      "Koordinasi lintas unit pelaksana akademik."
    ]
  },
  "Kesantrian & Pengasuhan": {
    "role": "Bidang",
    "title": "Kesantrian & Pengasuhan",
    "summary": "Penanggung jawab pembinaan akhlak, kedisiplinan, dan penyiapan konsep pengasuhan mukim.",
    "tugas": [
      "Menyusun tata tertib santri dan sistem penegakan kedisiplinan.",
      "Membina akhlak, adab, dan karakter Qur'ani santri dalam keseharian.",
      "Menangani perizinan, pelanggaran, dan bimbingan konseling santri.",
      "Menyelenggarakan kegiatan pembinaan, mentoring, dan ekstrakurikuler santri.",
      "Berkoordinasi dengan wali santri terkait perkembangan perilaku dan kedisiplinan anak.",
      "Melaporkan kondisi kesantrian secara berkala kepada Mudir."
    ],
    "fungsi": [
      "Pembinaan karakter dan akhlak.",
      "Penegakan disiplin santri.",
      "Penyiapan sistem pengasuhan mukim.",
      "Penghubung lembaga-wali santri dalam aspek kesantrian."
    ]
  },
  "Sarpras & Umum": {
    "role": "Bidang",
    "title": "Sarpras & Umum",
    "summary": "Penanggung jawab fasilitas, logistik, dan kerumahtanggaan.",
    "tugas": [
      "Mengelola dan memelihara sarana-prasarana RTQ agar layak pakai.",
      "Menyediakan kebutuhan logistik halaqah, kelas, dan kegiatan lembaga.",
      "Mengoordinasikan kebersihan, keamanan, dan kerumahtanggaan harian.",
      "Menyiapkan rencana, RAB, dan pengadaan kebutuhan sarana.",
      "Menginventarisasi, mendata, dan menjaga aset lembaga secara tertib.",
      "Menangani perbaikan dan pemeliharaan fasilitas secara responsif.",
      "Mengoordinasikan pengadaan barang/jasa sesuai kebutuhan operasional.",
      "Melaporkan kondisi aset dan sarana kepada Mudir secara berkala."
    ],
    "fungsi": [
      "Pengelolaan aset dan fasilitas.",
      "Dukungan logistik operasional.",
      "Pemeliharaan fasilitas.",
      "Pengelola pengadaan barang/jasa lembaga."
    ]
  },
  "Humas & Kerja Sama": {
    "role": "Bidang",
    "title": "Humas & Kerja Sama",
    "summary": "Penanggung jawab hubungan masyarakat, komunikasi wali santri, kemitraan, dan PPDB.",
    "tugas": [
      "Menjembatani komunikasi lembaga dengan wali santri secara rutin dan responsif.",
      "Mengelola publikasi, media sosial, dan citra lembaga di ruang publik.",
      "Menggalang dukungan donatur dan mitra strategis untuk program RTQ.",
      "Mensosialisasikan konsep boarding dan program tahfidz kepada masyarakat.",
      "Menyelenggarakan kegiatan kehumasan, open house, dan PPDB (penerimaan santri baru).",
      "Menyusun materi promosi dan dokumentasi kegiatan lembaga.",
      "Menangani pengaduan dan masukan dari wali santri/masyarakat sebagai bahan perbaikan.",
      "Melaporkan hasil kegiatan humas & PPDB kepada Mudir secara berkala."
    ],
    "fungsi": [
      "Komunikasi publik dan branding.",
      "Pengembangan kemitraan.",
      "Penggalangan dukungan eksternal.",
      "Pengelola PPDB & promosi lembaga."
    ]
  },
  "Koordinator Tata Usaha": {
    "role": "Pendukung",
    "title": "Koordinator Tata Usaha",
    "summary": "Pemimpin unit Tata Usaha yang mengoordinasikan administrasi, presensi, kepegawaian, dan keuangan operasional RTQ.",
    "tugas": [
      "Memimpin dan membagi tugas staf Tata Usaha (administrasi, presensi/kepegawaian, keuangan).",
      "Mengoordinasikan penyusunan dan validasi seluruh data administrasi RTQ sebelum dilaporkan.",
      "Memastikan sistem presensi (RTQ Absensi) berjalan lancar dan datanya akurat.",
      "Mengawal proses pembukuan kas harian dan pelaporan keuangan operasional ke Bendahara Yayasan.",
      "Menjadi penghubung utama Tata Usaha dengan Mudir dan bidang-bidang lain terkait kebutuhan administratif.",
      "Menyusun rekapitulasi bulanan administrasi, presensi, dan keuangan RTQ.",
      "Mengarsipkan dan menjaga kerahasiaan dokumen serta data santri/pegawai.",
      "Mengevaluasi kinerja staf TU dan mengusulkan perbaikan alur kerja administrasi."
    ],
    "fungsi": [
      "Kepemimpinan unit Tata Usaha.",
      "Koordinasi administrasi, presensi, dan keuangan operasional.",
      "Penjamin akurasi dan ketertiban data & dokumen RTQ.",
      "Penghubung TU dengan Mudir & bidang lain."
    ]
  },
  "Staf Administrasi & Kesantrian": {
    "role": "Staf TU",
    "title": "Staf Administrasi & Kesantrian",
    "summary": "Pengelola data santri, surat-menyurat, dan arsip dokumen administratif RTQ.",
    "tugas": [
      "Mengelola dan memutakhirkan biodata serta dokumen santri (formulir, KK, akta, dsb).",
      "Menerbitkan dan mengarsipkan surat-menyurat RTQ (surat keterangan, undangan, edaran).",
      "Mengelola pendaftaran santri baru bersama Bidang Humas & PPDB.",
      "Menyiapkan dokumen administratif untuk kebutuhan Mudir dan bidang lain.",
      "Mengarsipkan dokumen santri secara rapi, aman, dan mudah ditelusuri.",
      "Melayani permintaan surat/dokumen dari wali santri sesuai prosedur.",
      "Melaporkan rekap data santri (jumlah, mutasi, status) kepada Koordinator Tata Usaha."
    ],
    "fungsi": [
      "Administrasi data & dokumen santri.",
      "Pengelolaan surat-menyurat.",
      "Layanan administrasi wali santri.",
      "Pendukung proses PPDB."
    ]
  },
  "Staf Presensi & Kepegawaian": {
    "role": "Staf TU",
    "title": "Staf Presensi & Kepegawaian",
    "summary": "Pengelola sistem presensi (RTQ Absensi) serta data kepegawaian ustadz dan staf RTQ.",
    "tugas": [
      "Mengoperasikan dan memutakhirkan sistem presensi GPS & QR Code (RTQ Absensi).",
      "Merekap kehadiran santri, muhaffizh, guru, dan staf secara harian/bulanan.",
      "Menindaklanjuti kendala teknis presensi (QR tidak terbaca, lokasi GPS, dsb.).",
      "Mengelola data kepegawaian (identitas, jadwal mengajar, riwayat kehadiran).",
      "Menyiapkan laporan kehadiran sebagai dasar penilaian kinerja & honorarium.",
      "Mengingatkan bidang terkait bila ada anomali kehadiran (ustadz/staf sering absen).",
      "Melaporkan rekap presensi bulanan kepada Koordinator Tata Usaha."
    ],
    "fungsi": [
      "Pengelolaan sistem presensi digital.",
      "Rekapitulasi kehadiran santri & pegawai.",
      "Administrasi data kepegawaian.",
      "Dasar data untuk penilaian kinerja."
    ]
  },
  "Staf Pengelolaan Keuangan & Pembukuan": {
    "role": "Staf TU",
    "title": "Staf Pengelolaan Keuangan & Pembukuan",
    "summary": "Pengelola kas harian, pembayaran wali santri, serta pembukuan dan pelaporan keuangan operasional RTQ.",
    "tugas": [
      "Mencatat transaksi kas masuk dan keluar operasional RTQ setiap hari.",
      "Mengelola pembayaran/iuran wali santri, menerbitkan kwitansi, serta memantau tunggakan.",
      "Melakukan opname kas dan serah terima kas secara berkala untuk menjaga keakuratan saldo.",
      "Menyusun laporan keuangan harian dan bulanan untuk Koordinator Tata Usaha.",
      "Menyiapkan rekonsiliasi kas dan dokumen pendukung transaksi (kwitansi, nota, bukti transfer).",
      "Menyampaikan laporan keuangan RTQ kepada Bendahara Yayasan sesuai jadwal.",
      "Mengingatkan wali santri terkait tunggakan pembayaran sesuai kebijakan lembaga.",
      "Menjaga keamanan dan kerapian dokumen bukti transaksi keuangan."
    ],
    "fungsi": [
      "Pengelolaan kas harian & pembukuan operasional.",
      "Pengelolaan pembayaran wali santri.",
      "Pelaporan keuangan operasional ke Bendahara Yayasan.",
      "Penjamin ketertiban & akurasi administrasi keuangan."
    ]
  },
  "Koordinator Halaqah": {
    "role": "Koordinator",
    "title": "Koordinator Halaqah",
    "summary": "Pengatur pembagian halaqah, jadwal setoran, dan kontrol capaian tiap kelompok.",
    "tugas": [
      "Membagi santri ke dalam halaqah sesuai capaian dan kemampuan hafalan.",
      "Menyusun jadwal setoran (ziyadah) dan muroja'ah harian/pekanan.",
      "Memantau dan mengevaluasi capaian hafalan tiap halaqah secara berkala.",
      "Mengoordinasikan muhaffizh serta mengisi kekosongan bila ada yang berhalangan.",
      "Melaporkan progres dan kendala halaqah ke Bidang Akademik & Tahfidz.",
      "Menyelenggarakan pertemuan koordinasi rutin dengan para muhaffizh/muhaffizhah.",
      "Mengelola data capaian hafalan santri per halaqah sebagai bahan evaluasi.",
      "Menindaklanjuti santri dengan capaian di bawah target bersama muhaffizh terkait."
    ],
    "fungsi": [
      "Koordinasi pelaksanaan halaqah.",
      "Kontrol capaian kelompok.",
      "Penghubung muhaffizh – akademik.",
      "Pengelola data capaian hafalan per halaqah."
    ]
  },
  "Koordinator Kurikulum": {
    "role": "Koordinator",
    "title": "Koordinator Kurikulum",
    "summary": "Penanggung jawab penyusunan, penyelarasan, dan pengembangan kurikulum tahfidz serta mata pelajaran umum di RTQ.",
    "tugas": [
      "Menyusun dan memperbarui kurikulum, silabus, serta target hafalan per marhalah.",
      "Menyelaraskan kurikulum tahfidz dengan mata pelajaran umum/penunjang agar tidak tumpang tindih.",
      "Menyusun kalender akademik bersama Bidang Akademik & Tahfidz.",
      "Mengembangkan perangkat pembelajaran (RPP/modul/lembar kerja) untuk muhaffizh dan guru.",
      "Mengevaluasi efektivitas kurikulum berdasarkan capaian dan umpan balik santri.",
      "Menyesuaikan kurikulum dengan regulasi pendidikan yang berlaku (mis. Kurikulum Merdeka/ketentuan Kemenag).",
      "Melatih dan mendampingi muhaffizh/guru dalam implementasi kurikulum baru.",
      "Menyusun dokumentasi kurikulum (KOSP, ATP, modul ajar) sebagai arsip mutu lembaga.",
      "Melaporkan perkembangan dan hasil evaluasi kurikulum kepada Bidang Akademik & Tahfidz."
    ],
    "fungsi": [
      "Pengembangan & penyelarasan kurikulum.",
      "Penyusunan perangkat pembelajaran.",
      "Evaluasi & pembaruan kurikulum.",
      "Pendamping implementasi kurikulum bagi pendidik.",
      "Penjaga kesesuaian kurikulum dengan regulasi pendidikan."
    ]
  },
  "Muhaffizh / Muhaffizhah": {
    "role": "Pelaksana Tahfidz",
    "title": "Muhaffizh / Muhaffizhah",
    "summary": "Pengampu halaqah yang membimbing setoran, tahsin, dan muroja'ah santri secara langsung.",
    "tugas": [
      "Menerima setoran hafalan baru (ziyadah) santri sesuai target marhalah.",
      "Membimbing muroja'ah dan perbaikan bacaan (tahsin) secara rutin.",
      "Mencatat capaian dan kendala hafalan tiap santri dalam buku/sistem monitoring.",
      "Membina adab, akhlak, dan kedekatan personal dengan santri binaan.",
      "Menjaga agar target hafalan sesuai marhalah tercapai tepat waktu.",
      "Melaporkan perkembangan santri kepada Koordinator Halaqah secara berkala.",
      "Mengidentifikasi santri yang memerlukan bimbingan khusus/tambahan.",
      "Menjadi teladan bacaan dan akhlak Qur'ani bagi santri binaan."
    ],
    "fungsi": [
      "Bimbingan tahfidz langsung.",
      "Perbaikan bacaan (tahsin).",
      "Pembinaan adab santri.",
      "Pemantau & pelapor capaian individu santri."
    ]
  },
  "Guru": {
    "role": "Pelaksana Tahfidz",
    "title": "Guru",
    "summary": "Pengajar mata pelajaran umum dan penunjang yang melengkapi program tahfidz, di bawah koordinasi Bidang Akademik & Tahfidz.",
    "tugas": [
      "Menyusun dan melaksanakan rencana pembelajaran mata pelajaran umum/penunjang.",
      "Mengajar sesuai jadwal dan kurikulum yang ditetapkan Bidang Akademik & Tahfidz.",
      "Menilai dan melaporkan capaian belajar santri secara berkala.",
      "Membina adab, kedisiplinan, dan keaktifan santri selama pembelajaran.",
      "Berkoordinasi dengan Koordinator Halaqah agar jadwal mapel tidak bentrok dengan setoran tahfidz.",
      "Melaporkan perkembangan dan kendala pembelajaran ke Bidang Akademik & Tahfidz.",
      "Menggunakan perangkat pembelajaran yang disusun Koordinator Kurikulum secara konsisten.",
      "Memberikan umpan balik kepada Koordinator Kurikulum untuk penyempurnaan modul ajar."
    ],
    "fungsi": [
      "Pengajaran mata pelajaran umum/penunjang.",
      "Penilaian capaian belajar santri.",
      "Pembinaan adab di kelas.",
      "Koordinasi jadwal dengan program tahfidz.",
      "Pemberi umpan balik pengembangan kurikulum."
    ]
  }
};


function StrukturOrganisasiSection() {
  const [mobileMode, setMobileMode] = useState<"bagan" | "daftar">("bagan");
  const [selectedJabatan, setSelectedJabatan] = useState<TupItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedJabatan(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedJabatan) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedJabatan]);

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

          {/* Interactive Hint */}
          <div className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs sm:text-[13px] text-emerald-800 shadow-2xs">
            <span>💡</span> Klik tiap kotak jabatan untuk melihat <b className="font-semibold text-[#0c3624]">Tugas Pokok &amp; Fungsi</b>
          </div>

          {/* Mobile View Toggle */}
          <div className="lg:hidden mt-6 block">
            <div className="inline-flex p-1 bg-white border border-neutral-200 rounded-xl shadow-xs">
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
              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Mudir / Kepala RTQ"])}
                className="bg-[#0c3624] text-white rounded-xl px-7 py-2.5 text-center shadow-md min-w-[260px] max-w-[300px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95 group relative border border-white/20"
                title="Klik untuk melihat Tugas Pokok & Fungsi Mudir"
              >
                <span className="absolute top-1.5 right-2.5 text-[11px] text-[#F1D9A6] opacity-75 group-hover:opacity-100 font-bold">ⓘ</span>
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
                <path d="M 520 0 L 520 18" stroke="#5A8270" strokeWidth="1.75" />
                <path d="M 150 18 L 890 18" stroke="#5A8270" strokeWidth="1.75" />
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
                  <div 
                    onClick={() => setSelectedJabatan(STRUKTUR_TUP["Akademik & Tahfidz"])}
                    className="w-[160px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2.5 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                    title="Klik untuk melihat Tugas Pokok & Fungsi Akademik & Tahfidz"
                  >
                    <span className="absolute top-1.5 right-2 text-[10px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                    <path d="M 150 0 L 150 16" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 47 16 L 253 16" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 47 16 L 47 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 150 16 L 150 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 253 16 L 253 32" stroke="#5A8270" strokeWidth="1.75" />
                  </svg>

                  {/* 3 Sub-columns under Akademik */}
                  <div className="flex items-start gap-[9px] w-[300px]">
                    
                    {/* Sub-col 1: Koordinator Halaqah + Pelaksana Muhaffizh */}
                    <div className="w-[94px] flex flex-col items-center">
                      <div 
                        onClick={() => setSelectedJabatan(STRUKTUR_TUP["Koordinator Halaqah"])}
                        className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                        title="Klik untuk melihat Tugas Pokok & Fungsi Koordinator Halaqah"
                      >
                        <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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

                      <div 
                        onClick={() => setSelectedJabatan(STRUKTUR_TUP["Muhaffizh / Muhaffizhah"])}
                        className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                        title="Klik untuk melihat Tugas Pokok & Fungsi Muhaffizh / Muhaffizhah"
                      >
                        <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                      <div 
                        onClick={() => setSelectedJabatan(STRUKTUR_TUP["Koordinator Kurikulum"])}
                        className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                        title="Klik untuk melihat Tugas Pokok & Fungsi Koordinator Kurikulum"
                      >
                        <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                      <div 
                        onClick={() => setSelectedJabatan(STRUKTUR_TUP["Guru"])}
                        className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                        title="Klik untuk melihat Tugas Pokok & Fungsi Guru"
                      >
                        <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                  <div 
                    onClick={() => setSelectedJabatan(STRUKTUR_TUP["Kesantrian & Pengasuhan"])}
                    className="w-[110px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                    title="Klik untuk melihat Tugas Pokok & Fungsi Kesantrian & Pengasuhan"
                  >
                    <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                  <div 
                    onClick={() => setSelectedJabatan(STRUKTUR_TUP["Sarpras & Umum"])}
                    className="w-[110px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                    title="Klik untuk melihat Tugas Pokok & Fungsi Sarpras & Umum"
                  >
                    <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                  <div 
                    onClick={() => setSelectedJabatan(STRUKTUR_TUP["Humas & Kerja Sama"])}
                    className="w-[110px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                    title="Klik untuk melihat Tugas Pokok & Fungsi Humas & Kerja Sama"
                  >
                    <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                  <div 
                    onClick={() => setSelectedJabatan(STRUKTUR_TUP["Koordinator Tata Usaha"])}
                    className="w-[160px] min-h-[96px] bg-white border-[1.5px] border-[#0c3624] rounded-xl p-2.5 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                    title="Klik untuk melihat Tugas Pokok & Fungsi Koordinator Tata Usaha"
                  >
                    <span className="absolute top-1.5 right-2 text-[10px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                    <path d="M 150 0 L 150 16" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 47 16 L 253 16" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 47 16 L 47 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 150 16 L 150 32" stroke="#5A8270" strokeWidth="1.75" />
                    <path d="M 253 16 L 253 32" stroke="#5A8270" strokeWidth="1.75" />
                  </svg>

                  {/* 3 Sub-columns under Tata Usaha */}
                  <div className="flex items-start gap-[9px] w-[300px]">
                    
                    {/* Sub-col 1: Staf Administrasi & Kesantrian */}
                    <div 
                      onClick={() => setSelectedJabatan(STRUKTUR_TUP["Staf Administrasi & Kesantrian"])}
                      className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                      title="Klik untuk melihat Tugas Pokok & Fungsi Staf Administrasi & Kesantrian"
                    >
                      <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                    <div 
                      onClick={() => setSelectedJabatan(STRUKTUR_TUP["Staf Presensi & Kepegawaian"])}
                      className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                      title="Klik untuk melihat Tugas Pokok & Fungsi Staf Presensi & Kepegawaian"
                    >
                      <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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
                    <div 
                      onClick={() => setSelectedJabatan(STRUKTUR_TUP["Staf Pengelolaan Keuangan & Pembukuan"])}
                      className="w-[94px] min-h-[96px] bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] rounded-xl p-2 text-center shadow-xs flex flex-col justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 group relative"
                      title="Klik untuk melihat Tugas Pokok & Fungsi Staf Pengelolaan Keuangan & Pembukuan"
                    >
                      <span className="absolute top-1 right-1.5 text-[9px] text-[#B08436] opacity-65 group-hover:opacity-100 font-bold">ⓘ</span>
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

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            2. DAFTAR HIERARKI (Alternatif Tampilan Mobile / Rapi)
           ════════════════════════════════════════════════════════ */}
        <div className={`space-y-4 max-w-md mx-auto ${mobileMode === "daftar" ? "block" : "hidden"}`}>
          {/* Mudir Card */}
          <div 
            onClick={() => setSelectedJabatan(STRUKTUR_TUP["Mudir / Kepala RTQ"])}
            className="bg-[#0c3624] text-white rounded-2xl p-4 text-center shadow-md cursor-pointer transition-all hover:shadow-lg active:scale-98 group relative"
          >
            <span className="absolute top-3 right-3 text-xs text-[#DEAB3E] opacity-75 group-hover:opacity-100 font-bold">ⓘ</span>
            <span className="text-[10px] font-bold text-[#DEAB3E] tracking-widest uppercase block mb-1">
              PIMPINAN
            </span>
            <h4 className="font-bold text-base text-white">Mudir / Kepala RTQ</h4>
            <p className="text-xs text-white/80 mt-1">Penanggung jawab tertinggi operasional</p>
          </div>

          {/* 1. Bidang Akademik & Tahfidz */}
          <div className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs">
            <div 
              onClick={() => setSelectedJabatan(STRUKTUR_TUP["Akademik & Tahfidz"])}
              className="cursor-pointer group relative mb-3 pb-2 border-b border-neutral-100"
            >
              <span className="absolute top-0 right-0 text-xs text-[#B08436] opacity-70 group-hover:opacity-100 font-bold">ⓘ</span>
              <span className="text-[10px] font-bold text-[#0c3624] uppercase tracking-wider block mb-1">
                BIDANG
              </span>
              <h4 className="font-bold text-sm text-[#0c3624] group-hover:text-[#9B7B3B] transition-colors">Akademik &amp; Tahfidz</h4>
              <p className="text-xs text-neutral-600">
                Target hafalan, marhalah, talaqqi &amp; muroja&apos;ah, evaluasi
              </p>
            </div>

            <div className="space-y-2 pl-3 border-l-2 border-[#9B7B3B]/40">
              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Koordinator Halaqah"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">KOORDINATOR</span>
                <span className="text-xs font-bold text-[#0c3624] block">Koordinator Halaqah</span>
                <span className="text-[10px] text-neutral-600 block">Pembagian halaqah &amp; jadwal setoran</span>
              </div>

              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Muhaffizh / Muhaffizhah"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">PELAKSANA</span>
                <span className="text-xs font-bold text-[#0c3624] block">Muhaffizh / Muhaffizhah</span>
                <span className="text-[10px] text-neutral-600 block">Pengampu halaqah &amp; bimbingan setoran</span>
              </div>

              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Koordinator Kurikulum"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">KOORDINATOR</span>
                <span className="text-xs font-bold text-[#0c3624] block">Koordinator Kurikulum</span>
                <span className="text-[10px] text-neutral-600 block">Penyusunan &amp; penyelarasan kurikulum tahfidz &amp; mapel umum</span>
              </div>

              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Guru"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">PELAKSANA</span>
                <span className="text-xs font-bold text-[#0c3624] block">Guru</span>
                <span className="text-[10px] text-neutral-600 block">Pengajar mata pelajaran umum &amp; penunjang</span>
              </div>
            </div>
          </div>

          {/* 2. Bidang Kesantrian & Pengasuhan */}
          <div 
            onClick={() => setSelectedJabatan(STRUKTUR_TUP["Kesantrian & Pengasuhan"])}
            className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs cursor-pointer hover:border-[#9B7B3B] transition-all group relative"
          >
            <span className="absolute top-3 right-3 text-xs text-[#B08436] opacity-70 group-hover:opacity-100 font-bold">ⓘ</span>
            <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
              BIDANG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Kesantrian &amp; Pengasuhan</h4>
            <p className="text-xs text-neutral-600">
              Akhlak, kedisiplinan &amp; pembinaan karakter
            </p>
          </div>

          {/* 3. Bidang Sarpras & Umum */}
          <div 
            onClick={() => setSelectedJabatan(STRUKTUR_TUP["Sarpras & Umum"])}
            className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs cursor-pointer hover:border-[#9B7B3B] transition-all group relative"
          >
            <span className="absolute top-3 right-3 text-xs text-[#B08436] opacity-70 group-hover:opacity-100 font-bold">ⓘ</span>
            <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
              BIDANG
            </span>
            <h4 className="font-bold text-sm text-[#0c3624]">Sarpras &amp; Umum</h4>
            <p className="text-xs text-neutral-600">
              Fasilitas, logistik &amp; kerumahtanggaan
            </p>
          </div>

          {/* 4. Bidang Humas & Kerja Sama */}
          <div 
            onClick={() => setSelectedJabatan(STRUKTUR_TUP["Humas & Kerja Sama"])}
            className="bg-white border-2 border-[#0c3624] rounded-2xl p-4 shadow-xs cursor-pointer hover:border-[#9B7B3B] transition-all group relative"
          >
            <span className="absolute top-3 right-3 text-xs text-[#B08436] opacity-70 group-hover:opacity-100 font-bold">ⓘ</span>
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
            <div 
              onClick={() => setSelectedJabatan(STRUKTUR_TUP["Koordinator Tata Usaha"])}
              className="cursor-pointer group relative mb-3 pb-2 border-b border-neutral-100"
            >
              <span className="absolute top-0 right-0 text-xs text-[#B08436] opacity-70 group-hover:opacity-100 font-bold">ⓘ</span>
              <span className="text-[10px] font-bold text-[#9B7B3B] uppercase tracking-wider block mb-1">
                PENDUKUNG
              </span>
              <h4 className="font-bold text-sm text-[#0c3624] group-hover:text-[#9B7B3B] transition-colors">Koordinator Tata Usaha</h4>
              <p className="text-xs text-neutral-600">
                Memimpin &amp; mengoordinasikan seluruh administrasi RTQ
              </p>
            </div>

            <div className="space-y-2 pl-3 border-l-2 border-[#9B7B3B]/40">
              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Staf Administrasi & Kesantrian"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">STAF TU</span>
                <span className="text-xs font-bold text-[#0c3624] block">Staf Administrasi &amp; Kesantrian</span>
                <span className="text-[10px] text-neutral-600 block">Data santri, surat-menyurat, arsip dokumen</span>
              </div>

              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Staf Presensi & Kepegawaian"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">STAF TU</span>
                <span className="text-xs font-bold text-[#0c3624] block">Staf Presensi &amp; Kepegawaian</span>
                <span className="text-[10px] text-neutral-600 block">Operasional RTQ Absensi &amp; data kepegawaian</span>
              </div>

              <div 
                onClick={() => setSelectedJabatan(STRUKTUR_TUP["Staf Pengelolaan Keuangan & Pembukuan"])}
                className="bg-[#FAF8F4] p-2.5 rounded-xl border border-[#9B7B3B]/30 cursor-pointer hover:border-[#9B7B3B] transition-colors group relative"
              >
                <span className="absolute top-2 right-2 text-[10px] text-[#B08436] opacity-60 group-hover:opacity-100 font-bold">ⓘ</span>
                <span className="text-[9px] font-bold text-[#0c3624] uppercase block">STAF TU</span>
                <span className="text-xs font-bold text-[#0c3624] block">Staf Pengelolaan Keuangan &amp; Pembukuan</span>
                <span className="text-[10px] text-neutral-600 block">Kas harian, pembayaran wali santri, pelaporan</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            3. LEGENDA & CATATAN
           ════════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-12 pt-6 border-t border-[#E1D8C4] text-xs text-[#4d5a54]">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-3.5 rounded-sm bg-gradient-to-br from-[#0d5c47] to-[#0a4a39] shadow-2xs inline-block" />
            <span className="font-medium">Pimpinan</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-3.5 rounded-sm bg-[#FAF8F4] border-[1.5px] border-[#0c3624] shadow-2xs inline-block" />
            <span className="font-medium">Bidang aktif</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-3.5 rounded-sm bg-[#FFFDF7] border-[1.5px] border-[#9B7B3B] shadow-2xs inline-block" />
            <span className="font-medium">Pelaksana tahfidz / TU</span>
          </div>
        </div>

        <p className="text-center text-xs text-[#7a8a83] leading-relaxed mt-4 max-w-2xl mx-auto">
          Jalur akademik: <b className="text-[#0c3624]">Mudir → Akademik &amp; Tahfidz → Koordinator Halaqah → Muhaffizh.</b><br className="hidden sm:inline" />
          {" "}Jalur keuangan RTQ tetap melapor ke <b className="text-[#0c3624]">Bendahara Yayasan</b>.
        </p>

      </div>

      {/* ════════════════════════════════════════════════════════
          4. MODAL TUPOKSI (POPUP DETAIL TUGAS POKOK & FUNGSI)
         ════════════════════════════════════════════════════════ */}
      {selectedJabatan && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#09281f]/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedJabatan(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-[#FCFAF4] text-[#1b2b27] max-w-xl w-full max-h-[88vh] overflow-y-auto rounded-2xl border border-[#E1D8C4] shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Head */}
            <div className="bg-gradient-to-br from-[#093f31] to-[#0d5c47] text-white p-5 sm:p-6 rounded-t-2xl relative">
              <button
                onClick={() => setSelectedJabatan(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center text-xl transition-colors leading-none"
                aria-label="Tutup"
              >
                &times;
              </button>
              <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#F1D9A6] uppercase">
                {selectedJabatan.role}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 text-white leading-tight">
                {selectedJabatan.title}
              </h3>
              {selectedJabatan.name && (
                <div className="text-sm font-semibold text-[#D9EAD3] mt-1">
                  {selectedJabatan.name}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Summary */}
              <div className="bg-[#F0ECE0] text-[#42514B] text-xs sm:text-sm leading-relaxed p-3.5 rounded-r-xl border-l-4 border-[#B08436]">
                {selectedJabatan.summary}
              </div>

              {/* Tugas Pokok */}
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.14em] text-[#0D5C47] uppercase mb-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C47]" />
                  Tugas Pokok
                </h4>
                <ul className="space-y-2">
                  {selectedJabatan.tugas.map((t, idx) => (
                    <li key={idx} className="relative pl-5 text-xs sm:text-[13.5px] text-[#33403a] leading-relaxed">
                      <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-[1px] bg-[#B08436] rotate-45" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fungsi */}
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.14em] text-[#0D5C47] uppercase mb-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D5C47]" />
                  Fungsi
                </h4>
                <ul className="space-y-2">
                  {selectedJabatan.fungsi.map((f, idx) => (
                    <li key={idx} className="relative pl-5 text-xs sm:text-[13.5px] text-[#33403a] leading-relaxed">
                      <span className="absolute left-1 top-2 w-1.5 h-1.5 rounded-[1px] bg-[#B08436] rotate-45" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note if any */}
              {selectedJabatan.note && (
                <div className="text-xs italic text-[#7C8782] pt-3 border-t border-dashed border-[#CDD5D0] leading-relaxed">
                  {selectedJabatan.note}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

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
   JADWAL & BIAYA PENDIDIKAN (Sesuai Excel S-Ganjil 2026)
──────────────────────────────────────────────────────── */

type JadwalItemType = {
  jam: string;
  waktu: string;
  kegiatan: string;
  guru: string;
};

type RamadhanDayItemType = {
  jam: string;
  waktu: string;
  "PRA SEKOLAH": string;
  "KELAS 1": string;
  "KELAS 2": string;
  "KELAS 4": string;
  "KELAS 5": string;
};

const JADWAL_MASTER: any = {"PRA SEKOLAH": {"name": "PRA SEKOLAH", "title": "Jadwal Pelajaran RTQ Abdurrahman bin Auf - PRA SEKOLAH", "semester": "Semester Ganjil 2026/2027", "days": {"Senin": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Membaca", "guru": "Bu Reza"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}], "Selasa": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Menulis", "guru": "Bu Reza"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}], "Rabu": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Berhitung", "guru": "Pak Ukasyah"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}], "Kamis": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Membaca", "guru": "Bu Septi"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}], "Jum'at": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "PJOK", "guru": "Bu Dian & Bu Reza"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "PKBM (Bahasa Daerah)", "guru": "Bu Septi & Bu Reza"}], "Sabtu": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "Menggambar", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Snack Time", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "Praktek Ibadah", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "10.10 - 11.10", "kegiatan": "Prakarya", "guru": "Bu Septi & Bu Reza"}]}}, "KELAS 1": {"name": "KELAS 1", "title": "Jadwal Pelajaran RTQ Abdurrahman bin Auf - KELAS 1", "semester": "Semester Ganjil 2026/2027", "days": {"Senin": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Reza"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Bahasa Arab", "guru": "Bu Septi"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Selasa": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Pendidikan Pancasila", "guru": "Bu Reza"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Matematika", "guru": "Bu Dian"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Rabu": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Aqidah", "guru": "Pak Ukasyah"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Reza"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Kamis": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Al - Qur'an Hadist", "guru": "Bu Septi"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Fiqih", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Jum'at": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "PJOK", "guru": "Pak Ukasyah & Bu Dian"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "PKBM (Bahasa Daerah)", "guru": ""}], "Sabtu": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "Bahasa Inggris", "guru": "Bu Reza"}, {"jam": "II", "waktu": "08.40 - 09.15", "kegiatan": "Coding & AI", "guru": "Bu Reza"}, {"jam": "III", "waktu": "09.15 - 09.50", "kegiatan": "Prakarya", "guru": "Bu Septi"}, {"jam": "", "waktu": "09.50 - 10.10", "kegiatan": "Snack Time", "guru": ""}, {"jam": "IV", "waktu": "10.10 - 10.45", "kegiatan": "Praktek Ibadah", "guru": "Pak Ukasyah"}, {"jam": "V", "waktu": "10.45 - 11.20", "kegiatan": "Pramuka", "guru": ""}, {"jam": "", "waktu": "Banyuwangi, ………………………….. 2026", "kegiatan": "", "guru": ""}]}}, "KELAS 2": {"name": "KELAS 2", "title": "Jadwal Pelajaran RTQ Abdurrahman bin Auf - KELAS 2", "semester": "Semester Ganjil 2026/2027", "days": {"Senin": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Al - Qur'an Hadist", "guru": "Bu Septi"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Reza"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Selasa": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Arab", "guru": "Bu Septi"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Pendidikan Pancasila", "guru": "Bu Reza"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Rabu": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Matematika", "guru": "Bu Dian"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Aqidah", "guru": "Bu Septi"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Kamis": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Reza"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Umar & Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Bahasa Inggris", "guru": "Bu Septi"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Jum'at": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "PJOK", "guru": "Pak Ukasyah & Bu Dian"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "PKBM (Bahasa Daerah)", "guru": ""}], "Sabtu": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "Fiqih", "guru": "Pak Ukasyah"}, {"jam": "II", "waktu": "08.40 - 09.15", "kegiatan": "Coding & AI", "guru": "Bu Reza"}, {"jam": "III", "waktu": "09.15 - 09.50", "kegiatan": "Prakarya", "guru": "Bu Septi"}, {"jam": "", "waktu": "09.50 - 10.10", "kegiatan": "Snack Time", "guru": ""}, {"jam": "IV", "waktu": "10.10 - 10.45", "kegiatan": "Praktek Ibadah", "guru": "Pak Ukasyah"}, {"jam": "V", "waktu": "10.45 - 11.20", "kegiatan": "Pramuka", "guru": ""}, {"jam": "", "waktu": "Banyuwangi, ………………………….. 2026", "kegiatan": "", "guru": ""}]}}, "KELAS 3": {"name": "KELAS 3", "title": "Jadwal Pelajaran RTQ Abdurrahman bin Auf - KELAS 3", "semester": "Semester Ganjil 2026/2027", "days": {"Senin": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Fiqih", "guru": "Pak Ukasyah"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Matematika", "guru": "Bu Dian"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Selasa": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Dian"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Aqidah", "guru": "Bu Septi"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Rabu": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Arab", "guru": "Bu Septi"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Pendidikan Pancasila", "guru": "Bu Dian"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Kamis": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Bu Husna"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Dian"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Bu Husna"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Bahasa Inggris", "guru": "Bu Dian"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Jum'at": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "PJOK", "guru": "Pak Ukasyah & Bu Dian"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "PKBM (Bahasa Daerah)", "guru": ""}], "Sabtu": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "Al - Qur'an Hadist", "guru": "Pak Umar"}, {"jam": "II", "waktu": "08.40 - 09.15", "kegiatan": "Coding & AI", "guru": "Bu Reza"}, {"jam": "III", "waktu": "09.15 - 09.50", "kegiatan": "Prakarya", "guru": "Bu Septi"}, {"jam": "", "waktu": "09.50 - 10.10", "kegiatan": "Istirahat", "guru": ""}, {"jam": "IV", "waktu": "10.10 - 10.45", "kegiatan": "IPAS", "guru": "Bu Reza"}, {"jam": "V", "waktu": "10.45 - 11.20", "kegiatan": "Pramuka", "guru": ""}, {"jam": "", "waktu": "Banyuwangi, ………………………….. 2026", "kegiatan": "", "guru": ""}]}}, "KELAS 5": {"name": "KELAS 5", "title": "Jadwal Pelajaran RTQ Abdurrahman bin Auf - KELAS 5", "semester": "Semester Ganjil 2026/2027", "days": {"Senin": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Fiqih", "guru": "Bu Husna"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Matematika", "guru": "Bu Titin"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Selasa": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.00", "kegiatan": "Coding & AI", "guru": "Pak Umar"}, {"jam": "III", "waktu": "10.00 - 10.35", "kegiatan": "SKI", "guru": "Pak Umar"}, {"jam": "IV", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "V", "waktu": "13.25 - 14.35", "kegiatan": "Matematika", "guru": "Bu Titin"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Rabu": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Reza"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "IPAS", "guru": "Bu Titin"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Kamis": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Aqidah", "guru": "Bu Husna"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Pendidikan Pancasila", "guru": "Bu Dian"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Reza"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Jum'at": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "PJOK", "guru": "Pak Ukasyah & Bu Dian"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "PKBM (Bahasa Daerah)", "guru": ""}], "Sabtu": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "Bahasa Inggris", "guru": "Bu Dian"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "Bahasa Arab", "guru": "Bu Septi"}, {"jam": "III", "waktu": "10.10 - 10.45", "kegiatan": "Al -Qur'an Hadist", "guru": "Bu Husna"}, {"jam": "IV", "waktu": "10.45 - 11.20", "kegiatan": "Pramuka", "guru": ""}, {"jam": "", "waktu": "Banyuwangi, ………………………….. 2026", "kegiatan": "", "guru": ""}]}}, "KELAS 6": {"name": "KELAS 6", "title": "Jadwal Pelajaran RTQ Abdurrahman bin Auf - KELAS 6", "semester": "Semester Ganjil 2026/2027", "days": {"Senin": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Bahasa Indonesia", "guru": "Bu Dian"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Matematika", "guru": "Bu Titin"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Selasa": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Fiqih", "guru": "Bu Husna"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "Matematika", "guru": "Bu Titin"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Rabu": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.35", "kegiatan": "Aqidah", "guru": "Pak Umar"}, {"jam": "III", "waktu": "10.35 - 11.45", "kegiatan": "Tahsin", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "IV", "waktu": "13.25 - 14.35", "kegiatan": "IPAS", "guru": "Bu Titin"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Kamis": [{"jam": "", "waktu": "07.30 - 07.45", "kegiatan": "Bina Karakter", "guru": ""}, {"jam": "I", "waktu": "07.45 - 08.55", "kegiatan": "Tahfidz", "guru": "Pak Ukasyah"}, {"jam": "", "waktu": "08.55 - 09.25", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.25 - 10.00", "kegiatan": "Coding & AI", "guru": "Pak Umar"}, {"jam": "III", "waktu": "10.00 - 10.35", "kegiatan": "SKI", "guru": "Pak Umar"}, {"jam": "IV", "waktu": "10.35 - 11.45", "kegiatan": "Bahasa Arab", "guru": "Bu Septi"}, {"jam": "", "waktu": "11.45 - 12.00", "kegiatan": "Makan Siang", "guru": ""}, {"jam": "", "waktu": "12.00 - 12.25", "kegiatan": "Wudhu + Sholat + Dzikir", "guru": ""}, {"jam": "", "waktu": "12.25 -13.25", "kegiatan": "Tidur Siang", "guru": ""}, {"jam": "V", "waktu": "13.25 - 14.35", "kegiatan": "Al - Qur'an Hadist", "guru": "Bu Husna"}, {"jam": "", "waktu": "14.35 -14.55", "kegiatan": "Piket Bersama", "guru": ""}, {"jam": "", "waktu": "14.55 - 15.10", "kegiatan": "Persiapan Sholat + pulang", "guru": ""}], "Jum'at": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "PJOK", "guru": "Pak Ukasyah & Bu Dian"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "PKBM (Bahasa Daerah)", "guru": ""}], "Sabtu": [{"jam": "I", "waktu": "07.30 - 08.40", "kegiatan": "Bahasa Inggris", "guru": "Bu Septi"}, {"jam": "", "waktu": "08.40 - 09.00", "kegiatan": "Istirahat", "guru": ""}, {"jam": "II", "waktu": "09.00 - 10.10", "kegiatan": "Pendidikan Pancasila", "guru": "Bu Dian"}, {"jam": "III", "waktu": "10.10 - 10.45", "kegiatan": "Bahasa Indonesia", "guru": "Bu Dian"}, {"jam": "IV", "waktu": "10.45 - 11.20", "kegiatan": "Pramuka", "guru": ""}, {"jam": "", "waktu": "Banyuwangi, ………………………….. 2026", "kegiatan": "", "guru": ""}]}}, "JADWAL RAMADHAN": {"name": "JADWAL RAMADHAN", "title": "Jadwal Pelajaran Khusus Bulan Ramadhan 1447 H", "semester": "Bulan Ramadhan 1447 H", "classes": ["PRA SEKOLAH", "KELAS 1", "KELAS 2", "KELAS 4", "KELAS 5"], "days": {"Senin": [{"jam": "1", "waktu": "07.30 - 07.45", "PRA SEKOLAH": "BK/Dzikir Pagi", "KELAS 1": "BK/Dzikir Pagi", "KELAS 2": "BK/Dzikir Pagi", "KELAS 4": "BK/Dzikir Pagi", "KELAS 5": "BK/Dzikir Pagi"}, {"jam": "2", "waktu": "07.45 - 08.30", "PRA SEKOLAH": "Tahfidz", "KELAS 1": "Tahfidz", "KELAS 2": "Tahfidz", "KELAS 4": "Tahfidz", "KELAS 5": "Tahfidz"}, {"jam": "3", "waktu": "08.30 - 09.15", "PRA SEKOLAH": "Membaca", "KELAS 1": "Matematika", "KELAS 2": "Fiqih", "KELAS 4": "Al - Qur'an Hadist", "KELAS 5": "Matematika"}, {"jam": "4", "waktu": "09.15 - 09.30", "PRA SEKOLAH": "Istirahat", "KELAS 1": "Istirahat", "KELAS 2": "Istirahat", "KELAS 4": "Istirahat", "KELAS 5": "Istirahat"}, {"jam": "5", "waktu": "09.30 - 10.15", "PRA SEKOLAH": "Tahsin", "KELAS 1": "Tahsin", "KELAS 2": "Tahsin", "KELAS 4": "Tahsin", "KELAS 5": "Tahsin"}, {"jam": "6", "waktu": "10.15 - 11.00", "PRA SEKOLAH": "Pulang", "KELAS 1": "Fiqih", "KELAS 2": "Matematika", "KELAS 4": "Matematika", "KELAS 5": "Al - Qur'an Hadist"}, {"jam": "7", "waktu": "11.00 - Pulang", "PRA SEKOLAH": "", "KELAS 1": "Pulang", "KELAS 2": "Pulang", "KELAS 4": "Pulang", "KELAS 5": "Pulang"}], "Selasa": [{"jam": "1", "waktu": "07.30 - 07.45", "PRA SEKOLAH": "BK/Dzikir Pagi", "KELAS 1": "BK/Dzikir Pagi", "KELAS 2": "BK/Dzikir Pagi", "KELAS 4": "BK/Dzikir Pagi", "KELAS 5": "BK/Dzikir Pagi"}, {"jam": "2", "waktu": "07.45 - 08.30", "PRA SEKOLAH": "Tahfidz", "KELAS 1": "Tahfidz", "KELAS 2": "Tahfidz", "KELAS 4": "Tahfidz", "KELAS 5": "Tahfidz"}, {"jam": "3", "waktu": "08.30 - 09.15", "PRA SEKOLAH": "Menulis", "KELAS 1": "Bahasa Indonesia", "KELAS 2": "Aqidah", "KELAS 4": "IPAS", "KELAS 5": "Fiqih"}, {"jam": "4", "waktu": "09.15 - 09.30", "PRA SEKOLAH": "Istirahat", "KELAS 1": "Istirahat", "KELAS 2": "Istirahat", "KELAS 4": "Istirahat", "KELAS 5": "Istirahat"}, {"jam": "5", "waktu": "09.30 - 10.15", "PRA SEKOLAH": "Tahsin", "KELAS 1": "Tahsin", "KELAS 2": "Tahsin", "KELAS 4": "Tahsin", "KELAS 5": "Tahsin"}, {"jam": "6", "waktu": "10.15 - 11.00", "PRA SEKOLAH": "Pulang", "KELAS 1": "Aqidah", "KELAS 2": "Bahasa Indonesia", "KELAS 4": "Fiqih", "KELAS 5": "IPAS"}, {"jam": "7", "waktu": "11.00 - Pulang", "PRA SEKOLAH": "", "KELAS 1": "Pulang", "KELAS 2": "Pulang", "KELAS 4": "Pulang", "KELAS 5": "Pulang"}], "Rabu": [{"jam": "1", "waktu": "07.30 - 07.45", "PRA SEKOLAH": "BK/Dzikir Pagi", "KELAS 1": "BK/Dzikir Pagi", "KELAS 2": "BK/Dzikir Pagi", "KELAS 4": "BK/Dzikir Pagi", "KELAS 5": "BK/Dzikir Pagi"}, {"jam": "2", "waktu": "07.45 - 08.30", "PRA SEKOLAH": "Tahfidz", "KELAS 1": "Tahfidz", "KELAS 2": "Tahfidz", "KELAS 4": "Tahfidz", "KELAS 5": "Tahfidz"}, {"jam": "3", "waktu": "08.30 - 09.15", "PRA SEKOLAH": "Berhitung", "KELAS 1": "Bahasa Arab", "KELAS 2": "PKN", "KELAS 4": "Matematika", "KELAS 5": "Aqidah"}, {"jam": "4", "waktu": "09.15 - 09.30", "PRA SEKOLAH": "Istirahat", "KELAS 1": "Istirahat", "KELAS 2": "Istirahat", "KELAS 4": "Istirahat", "KELAS 5": "Istirahat"}, {"jam": "5", "waktu": "09.30 - 10.15", "PRA SEKOLAH": "Tahsin", "KELAS 1": "Tahsin", "KELAS 2": "Tahsin", "KELAS 4": "Tahsin", "KELAS 5": "Tahsin"}, {"jam": "6", "waktu": "10.15 - 11.00", "PRA SEKOLAH": "Pulang", "KELAS 1": "PKN", "KELAS 2": "Bahasa Arab", "KELAS 4": "Aqidah", "KELAS 5": "Matematika"}, {"jam": "7", "waktu": "11.00 - Pulang", "PRA SEKOLAH": "", "KELAS 1": "Pulang", "KELAS 2": "Pulang", "KELAS 4": "Pulang", "KELAS 5": "Pulang"}], "Kamis": [{"jam": "1", "waktu": "07.30 - 07.45", "PRA SEKOLAH": "BK/Dzikir Pagi", "KELAS 1": "BK/Dzikir Pagi", "KELAS 2": "BK/Dzikir Pagi", "KELAS 4": "BK/Dzikir Pagi", "KELAS 5": "BK/Dzikir Pagi"}, {"jam": "2", "waktu": "07.45 - 08.30", "PRA SEKOLAH": "Tahfidz", "KELAS 1": "Tahfidz", "KELAS 2": "Tahfidz", "KELAS 4": "Tahfidz", "KELAS 5": "Tahfidz"}, {"jam": "3", "waktu": "08.30 - 09.15", "PRA SEKOLAH": "Membaca", "KELAS 1": "Bahasa Indonesia", "KELAS 2": "Al - Qur'an Hadist", "KELAS 4": "SKI", "KELAS 5": "Bahasa Arab"}, {"jam": "4", "waktu": "09.15 - 09.30", "PRA SEKOLAH": "Istirahat", "KELAS 1": "Istirahat", "KELAS 2": "Istirahat", "KELAS 4": "Istirahat", "KELAS 5": "Istirahat"}, {"jam": "5", "waktu": "09.30 - 10.15", "PRA SEKOLAH": "Tahsin", "KELAS 1": "Tahsin", "KELAS 2": "Tahsin", "KELAS 4": "Bahasa Arab", "KELAS 5": "PKN"}, {"jam": "6", "waktu": "10.15 - 11.00", "PRA SEKOLAH": "Pulang", "KELAS 1": "Al - Qur'an Hadist", "KELAS 2": "Bahasa Indonesia", "KELAS 4": "PKN", "KELAS 5": "SKI"}, {"jam": "7", "waktu": "11.00 - Pulang", "PRA SEKOLAH": "", "KELAS 1": "Pulang", "KELAS 2": "Pulang", "KELAS 4": "Pulang", "KELAS 5": "Pulang"}], "Jum'at": [{"jam": "1", "waktu": "07.30 - 08.00", "PRA SEKOLAH": "BK/Dzikir/Sholat", "KELAS 1": "BK/Dzikir/Sholat", "KELAS 2": "BK/Dzikir/Sholat", "KELAS 4": "BK/Dzikir/Sholat", "KELAS 5": "BK/Dzikir/Sholat"}, {"jam": "2", "waktu": "08.00 - 08.45", "PRA SEKOLAH": "Praktek Ibadah", "KELAS 1": "Praktek Ibadah", "KELAS 2": "Praktek Ibadah", "KELAS 4": "Bahasa Indonesia", "KELAS 5": "Bahasa Arab"}, {"jam": "3", "waktu": "08.45 - 09.15", "PRA SEKOLAH": "Istirahat", "KELAS 1": "Istirahat", "KELAS 2": "Istirahat", "KELAS 4": "Istirahat", "KELAS 5": "Istirahat"}, {"jam": "4", "waktu": "09.15 - 10.00", "PRA SEKOLAH": "", "KELAS 1": "Bahasa Inggris", "KELAS 2": "Bahasa Inggris", "KELAS 4": "Bahasa Arab", "KELAS 5": "Bahasa Indonesia"}], "Sabtu": [{"jam": "1", "waktu": "07.30 - 08.00", "PRA SEKOLAH": "Prakarya", "KELAS 1": "Prakarya", "KELAS 2": "Prakarya", "KELAS 4": "Prakarya", "KELAS 5": "Prakarya"}, {"jam": "2", "waktu": "08.00 - 08.45", "PRA SEKOLAH": "Prakarya", "KELAS 1": "Prakarya", "KELAS 2": "Prakarya", "KELAS 4": "Prakarya", "KELAS 5": "Prakarya"}, {"jam": "3", "waktu": "08.45 - 09.15", "PRA SEKOLAH": "Istirahat", "KELAS 1": "Istirahat", "KELAS 2": "Istirahat", "KELAS 4": "Istirahat", "KELAS 5": "Istirahat"}, {"jam": "4", "waktu": "09.15 - 10.30", "PRA SEKOLAH": "PKBM/Menggambar", "KELAS 1": "PKBM/Bhs.Indo", "KELAS 2": "PKBM/Bhs.Indo", "KELAS 4": "PKBM/MTK", "KELAS 5": "PKBM/MTK"}]}}};

const GURU_LIST = [
  { kode: 1, nama: "Pak Ukasyah", mapel: "Praktek Ibadah, Fiqih, Berhitung, PJOK" },
  { kode: 2, nama: "Pak Umar", mapel: "Tahfidz, Tahsin, Menggambar, Bina Karakter" },
  { kode: 3, nama: "Bu Septi", mapel: "Al-Qur'an Hadits, Bahasa Arab, Prakarya" },
  { kode: 4, nama: "Bu Husna", mapel: "Tahfidz, Tahsin, Fiqih, Aqidah" },
  { kode: 5, nama: "Bu Dian", mapel: "Matematika, Pendidikan Pancasila, PJOK" },
  { kode: 6, nama: "Bu Reza", mapel: "Bahasa Indonesia, Coding & AI, Bahasa Inggris, IPAS" },
  { kode: 7, nama: "Bu Titin", mapel: "Matematika & Pendamping" },
];

function JadwalBiayaSection() {
  const [selectedClass, setSelectedClass] = useState<string>("KELAS 1");
  const [selectedDay, setSelectedDay] = useState<string>("Senin");
  const [gelombangTab, setGelombangTab] = useState<"gel1" | "gel2">("gel1");

  const classList = [
    { id: "PRA SEKOLAH", label: "Pra Sekolah" },
    { id: "KELAS 1", label: "Kelas 1" },
    { id: "KELAS 2", label: "Kelas 2" },
    { id: "KELAS 3", label: "Kelas 3" },
    { id: "KELAS 5", label: "Kelas 5" },
    { id: "KELAS 6", label: "Kelas 6" },
    { id: "JADWAL RAMADHAN", label: "🌙 Ramadhan 1447 H" },
  ];

  const daysList = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];

  const isRamadhan = selectedClass === "JADWAL RAMADHAN";
  const currentClassData = JADWAL_MASTER[selectedClass];

  return (
    <section id="jadwal" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF8F4] border-b border-neutral-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
            TAHUN AJARAN 2026 - 2027 · SEMESTER GANJIL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0c3624] tracking-tight mb-3">
            Jadwal &amp; Biaya Pendidikan
          </h2>
          <div className="w-16 h-1 bg-[#DEAB3E] rounded-full mx-auto mb-4" />
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Jadwal operasional pembelajaran terpadu (Tahfidz, Tahsin, Diniyah, Karakter &amp; Mapel Umum) serta transparansi rincian biaya pendidikan RTQ Abdurrahman bin Auf.
          </p>
        </div>

        {/* Jenjang / Kelas Tab Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {classList.map((c) => {
              const active = selectedClass === c.id;
              const isSpecial = c.id === "JADWAL RAMADHAN";
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClass(c.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? isSpecial
                        ? "bg-amber-600 text-white shadow-md scale-102"
                        : "bg-[#0c3624] text-white shadow-md scale-102"
                      : isSpecial
                      ? "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
                      : "bg-white text-neutral-600 border border-neutral-200/90 hover:border-[#0c3624] hover:text-[#0c3624]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ════════════════════════════════════════════════════════
              KOLOM KIRI (7 SPAN): TABEL JADWAL PELAJARAN
             ════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-neutral-200 flex flex-col justify-between">
            <div>
              {/* Header Box Jadwal */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-100">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#9B7B3B]">
                    {isRamadhan ? "Edisi Spesial" : "Jadwal Pelajaran"}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0c3624] flex items-center gap-2">
                    <span>{isRamadhan ? "Jadwal Khusus Bulan Ramadhan 1447 H" : `Jadwal Pelajaran — ${classList.find(c => c.id === selectedClass)?.label}`}</span>
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {isRamadhan ? "Penyesuaian jam belajar & ibadah selama bulan Ramadhan" : "Semester Ganjil · Tahun Ajaran 2026/2027"}
                  </p>
                </div>

                {/* Badge Waktu Pulang */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-semibold self-start sm:self-auto">
                  <span>⏱️</span>
                  <span>{isRamadhan ? "07.30 - 11.00 WIB" : selectedDay === "Jum'at" ? "Pulang: 10.10 WIB" : selectedDay === "Sabtu" ? "Pulang: 11.20 WIB" : "Pulang: 15.10 WIB"}</span>
                </div>
              </div>

              {/* Hari Selector Tabs */}
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-3 mb-4 -mx-1 px-1 no-scrollbar">
                {daysList.map((day) => {
                  const active = selectedDay === day;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        active
                          ? "bg-[#0c3624] text-white shadow-2xs"
                          : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Content Table */}
              {!isRamadhan ? (
                /* REGULAR CLASS TABLE */
                <div className="overflow-x-auto">
                  <table className="table w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0c3624] text-[#F1D9A6]">
                        <th className="rounded-l-xl py-2.5 px-3 text-center w-14">Jam</th>
                        <th className="py-2.5 px-3 w-28">Waktu</th>
                        <th className="py-2.5 px-3">Materi / Kegiatan</th>
                        <th className="rounded-r-xl py-2.5 px-3 text-right">Pengampu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      {(currentClassData?.days?.[selectedDay] || []).map((item: JadwalItemType, idx: number) => {
                        const isTahfidz = item.kegiatan.toLowerCase().includes("tahfidz") || item.kegiatan.toLowerCase().includes("tahsin");
                        const isRest = item.kegiatan.toLowerCase().includes("istirahat") || item.kegiatan.toLowerCase().includes("makan") || item.kegiatan.toLowerCase().includes("tidur") || item.kegiatan.toLowerCase().includes("piket") || item.kegiatan.toLowerCase().includes("sholat");
                        const isKarakter = item.kegiatan.toLowerCase().includes("bina karakter") || item.kegiatan.toLowerCase().includes("ibadah");
                        const isCoding = item.kegiatan.toLowerCase().includes("coding") || item.kegiatan.toLowerCase().includes("ai");

                        return (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              isTahfidz
                                ? "bg-emerald-50/70 hover:bg-emerald-100/60 font-medium"
                                : isRest
                                ? "bg-neutral-50/60 hover:bg-neutral-100/50 text-neutral-500"
                                : "hover:bg-neutral-50"
                            }`}
                          >
                            <td className="py-2.5 px-3 text-center font-bold text-neutral-600 text-xs">
                              {item.jam || "—"}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-neutral-800 text-xs whitespace-nowrap">
                              {item.waktu}
                            </td>
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`font-semibold ${isTahfidz ? "text-[#0c3624]" : "text-neutral-800"}`}>
                                  {item.kegiatan}
                                </span>
                                {isTahfidz && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                                    Tahfidz
                                  </span>
                                )}
                                {isCoding && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-600 text-white">
                                    Digital
                                  </span>
                                )}
                                {isKarakter && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#9B7B3B] text-white">
                                    Karakter
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-right text-xs">
                              {item.guru ? (
                                <span className="font-medium text-[#0c3624] bg-neutral-100 px-2 py-0.5 rounded-full inline-block">
                                  {item.guru}
                                </span>
                              ) : (
                                <span className="text-neutral-400 text-[11px]">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* RAMADHAN TABLE (MULTI CLASS VIEW FOR DAY) */
                <div className="overflow-x-auto">
                  <table className="table w-full text-xs">
                    <thead>
                      <tr className="bg-[#0c3624] text-[#F1D9A6]">
                        <th className="rounded-l-xl py-2.5 px-2 text-center w-10">Jam</th>
                        <th className="py-2.5 px-2 w-24">Waktu</th>
                        <th className="py-2.5 px-2">Pra-Sekolah</th>
                        <th className="py-2.5 px-2">Kelas 1</th>
                        <th className="py-2.5 px-2">Kelas 2</th>
                        <th className="py-2.5 px-2">Kelas 4</th>
                        <th className="rounded-r-xl py-2.5 px-2">Kelas 5</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      {(currentClassData?.days?.[selectedDay] || []).map((row: RamadhanDayItemType, idx: number) => (
                        <tr key={idx} className="hover:bg-amber-50/50 transition">
                          <td className="py-2 px-2 text-center font-bold text-neutral-500">
                            {row.jam}
                          </td>
                          <td className="py-2 px-2 font-bold text-neutral-800 whitespace-nowrap">
                            {row.waktu}
                          </td>
                          <td className="py-2 px-2 text-neutral-700">{row["PRA SEKOLAH"] || "—"}</td>
                          <td className="py-2 px-2 text-neutral-700">{row["KELAS 1"] || "—"}</td>
                          <td className="py-2 px-2 text-neutral-700">{row["KELAS 2"] || "—"}</td>
                          <td className="py-2 px-2 text-neutral-700">{row["KELAS 4"] || "—"}</td>
                          <td className="py-2 px-2 text-neutral-700">{row["KELAS 5"] || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Catatan Kaki Jadwal */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-500 gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Materi Tahfidz &amp; Tahsin dilaksanakan intensif setiap pagi.</span>
                </span>
                <span className="text-[11px] text-neutral-400">
                  RTQ Abdurrahman bin Auf · Banyuwangi
                </span>
              </div>
            </div>

            {/* Quote Hadits dari Dokumen Excel */}
            <div className="mt-6 p-4 rounded-2xl bg-[#F0ECE0] border-l-4 border-[#9B7B3B] text-neutral-700">
              <div className="font-serif text-right text-sm text-[#0c3624] font-bold mb-1 leading-relaxed" dir="rtl">
                اِحْـرِصْ عَـلَـى مَا يَـنْـفَـعُـكَ وَاسْتَعِنْ بِاللهِ وَلَا تَـعْجَـزْ
              </div>
              <p className="text-xs italic text-neutral-600 leading-snug">
                &ldquo;Bersungguh-sungguhlah untuk mendapatkan apa yang bermanfaat bagimu, dan mintalah pertolongan kepada Allah serta janganlah sekali-kali engkau merasa lemah.&rdquo;
              </p>
              <div className="text-[10px] text-neutral-500 font-semibold mt-1">
                (HR. Muslim) · Pengesahan: Dava Firdaus S.R., S.Pd (Ketua) &amp; Septia Zuhrotul L., S.Pd (PJ)
              </div>
            </div>

          </div>

          {/* ════════════════════════════════════════════════════════
              KOLOM KANAN (5 SPAN): RINCIAN BIAYA PENDIDIKAN
             ════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Kartu Rincian Biaya Pendidikan & Pendaftaran (Sesuai Dokumen BIAYA PENDAFTARAN.docx) */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-neutral-200">
              
              {/* Header Card */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-100">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-[#9B7B3B] uppercase tracking-wider">
                    Sistem Penerimaan Santri Baru (SPMB)
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[#0c3624] flex items-center gap-2 mt-0.5">
                    <svg className="w-5 h-5 fill-[#DEAB3E]" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <span>Biaya Pendaftaran</span>
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-[#0c3624] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap shadow-2xs">
                  2026–2027
                </span>
              </div>

              {/* Tab Switcher Gelombang 1 vs Gelombang 2 */}
              <div className="flex items-center gap-2 p-1 bg-[#F5EFE6] rounded-2xl mb-4">
                <button
                  type="button"
                  onClick={() => setGelombangTab("gel1")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    gelombangTab === "gel1"
                      ? "bg-[#0c3624] text-[#F1D9A6] shadow-sm"
                      : "text-neutral-700 hover:text-[#0c3624] hover:bg-white/50"
                  }`}
                >
                  <div>GELOMBANG 1</div>
                  <div className="text-[10px] font-normal opacity-85">01 Nov 25 – 31 Jan 26</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGelombangTab("gel2")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    gelombangTab === "gel2"
                      ? "bg-[#0c3624] text-[#F1D9A6] shadow-sm"
                      : "text-neutral-700 hover:text-[#0c3624] hover:bg-white/50"
                  }`}
                >
                  <div>GELOMBANG 2</div>
                  <div className="text-[10px] font-normal opacity-85">01 Feb 26 – 30 Jun 26*</div>
                </button>
              </div>

              {/* Tabel Rincian Biaya (Sesuai BIAYA PENDAFTARAN.docx) */}
              <div className="overflow-hidden rounded-2xl border border-neutral-200 mb-4 bg-white shadow-2xs">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#0c3624] text-white">
                      <th className="py-2.5 px-3 text-left font-bold">DAFTAR</th>
                      <th className="py-2.5 px-3 text-right font-bold text-[#F1D9A6]">LAKI - LAKI</th>
                      <th className="py-2.5 px-3 text-right font-bold text-[#F1D9A6]">PEREMPUAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-neutral-800">
                    <tr className="hover:bg-amber-50/50 transition">
                      <td className="py-2.5 px-3 font-semibold">Pendaftaran</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 100,000.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 100,000.00</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition">
                      <td className="py-2.5 px-3 font-semibold">Seragam</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 500,000.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 700,000.00</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition">
                      <td className="py-2.5 px-3 font-semibold">
                        Buku <span className="text-[#9B7B3B] font-bold">***</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">
                        {gelombangTab === "gel1" ? "Rp 330,000.00" : "Rp 280,000.00"}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">
                        {gelombangTab === "gel1" ? "Rp 330,000.00" : "Rp 280,000.00"}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition">
                      <td className="py-2.5 px-3 font-semibold">
                        Uang Kegiatan <span className="text-[#9B7B3B] font-bold">***</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 350,000.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 350,000.00</td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition">
                      <td className="py-2.5 px-3 font-semibold">
                        Gedung &amp; Sarana <span className="text-[#9B7B3B] font-bold">**</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">
                        {gelombangTab === "gel1" ? "Rp 1,500,000.00" : "Rp 1,750,000.00"}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">
                        {gelombangTab === "gel1" ? "Rp 1,500,000.00" : "Rp 1,750,000.00"}
                      </td>
                    </tr>
                    <tr className="hover:bg-amber-50/50 transition">
                      <td className="py-2.5 px-3 font-semibold">Raport &amp; Foto</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 120,000.00</td>
                      <td className="py-2.5 px-3 text-right font-mono text-neutral-700">Rp 120,000.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#FAF4E6] border-t-2 border-[#DEAB3E] font-black text-xs text-[#0c3624]">
                      <td className="py-3 px-3">
                        <div>TOTAL MASUK</div>
                        <div className="text-[10px] font-normal text-neutral-500">
                          {gelombangTab === "gel1" ? "Gelombang 1" : "Gelombang 2"}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-sm text-[#0c3624]">
                        {gelombangTab === "gel1" ? "Rp 2.900.000" : "Rp 3.100.000"}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-sm text-[#0c3624]">
                        {gelombangTab === "gel1" ? "Rp 3.100.000" : "Rp 3.300.000"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* SPP Pilihan Section */}
              <div className="mb-4 p-4 rounded-2xl bg-[#F8F9FA] border border-neutral-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs sm:text-sm text-[#0c3624] flex items-center gap-1.5">
                    <span>🗓️</span>
                    <span>SPP (Infaq Bulanan)*:</span>
                  </span>
                  <span className="text-[10px] font-semibold text-neutral-500 bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                    Pilihan Mandiri
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 mb-2.5">
                  Besaran SPP bulanan dipilih sesuai kerelaan &amp; kemampuan wali santri:
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-xl border border-neutral-200 shadow-2xs hover:border-[#0c3624] transition">
                    <span className="text-[10px] font-semibold text-neutral-400 block">Opsi 1</span>
                    <span className="font-black text-xs sm:text-sm text-[#0c3624]">Rp 100.000</span>
                    <span className="text-[9px] text-neutral-400 block">/ bulan</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-neutral-200 shadow-2xs hover:border-[#0c3624] transition">
                    <span className="text-[10px] font-semibold text-neutral-400 block">Opsi 2</span>
                    <span className="font-black text-xs sm:text-sm text-[#0c3624]">Rp 125.000</span>
                    <span className="text-[9px] text-neutral-400 block">/ bulan</span>
                  </div>
                  <div className="bg-[#FFFDF7] p-2 rounded-xl border-2 border-[#DEAB3E] shadow-2xs">
                    <span className="text-[10px] font-bold text-[#9B7B3B] block">Opsi 3</span>
                    <span className="font-black text-xs sm:text-sm text-[#0c3624]">Rp 150.000</span>
                    <span className="text-[9px] text-[#9B7B3B] block font-semibold">/ bulan</span>
                  </div>
                </div>
              </div>

              {/* Catatan Kaki Sesuai Dokumen BIAYA PENDAFTARAN.docx */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-neutral-200/90 text-[11px] text-neutral-600 space-y-1.5">
                <div className="font-bold text-[#0c3624] text-[11.5px] flex items-center gap-1.5 mb-1">
                  <span>📌</span>
                  <span>Keterangan Biaya (Dokumen Resmi):</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-[#9B7B3B] mt-0.5">*</span>
                  <span>Belum termasuk SPP bulan Juli</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-[#9B7B3B] mt-0.5">**</span>
                  <span>Uang Gedung &amp; sarana bisa dicicil selama 1 tahun ajaran</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-[#9B7B3B] mt-0.5">***</span>
                  <span>Uang buku &amp; uang kegiatan sekolah untuk 1 tahun ajaran</span>
                </div>
                <div className="flex items-start gap-1.5 pt-1 border-t border-neutral-200/60 text-neutral-500">
                  <span className="text-[#DEAB3E] font-bold">ℹ️</span>
                  <span><em>Gelombang 2 tidak dibuka jika kuota (15 santri) sudah terpenuhi pada Gelombang 1.</em></span>
                </div>
              </div>

              {/* CTA Konsultasi SPMB ke WhatsApp */}
              <a
                href="https://wa.me/6285212185139?text=Assalamu%27alaikum%20Panitia%20SPMB%20RTQ%20Abdurrahman%20bin%20Auf,%20saya%20ingin%20konsultasi%20mengenai%20rincian%20Biaya%20Pendaftaran%20Santri%20Baru."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-[#0c3624] hover:bg-[#134932] text-[#F1D9A6] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>💬 Konsultasi Biaya via WhatsApp (0852-1218-5139)</span>
                <span>↗</span>
              </a>

            </div>

            {/* Tim Pengajar & Guru Pengampu */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200">
              <h4 className="font-bold text-sm text-[#0c3624] mb-3 flex items-center gap-2">
                <span>👨‍🏫</span>
                <span>Tim Guru Pengampu (S-Ganjil 2026):</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {GURU_LIST.map((g) => (
                  <div key={g.kode} className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col">
                    <span className="font-bold text-[#0c3624] text-[11.5px]">{g.nama}</span>
                    <span className="text-[10px] text-neutral-500 truncate" title={g.mapel}>{g.mapel}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metode Pembayaran & Rekening */}
            <div className="bg-[#FAF4E6] border border-[#e8dfcf] rounded-3xl p-6">
              <h4 className="font-bold text-sm text-[#0c3624] mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 fill-[#0c3624]" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                <span>Metode Pembayaran:</span>
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed mb-3">
                Pembayaran infaq &amp; pendaftaran dapat ditransfer melalui <b>Bank Syariah Indonesia (BSI)</b>, e-Wallet (GoPay, OVO, Dana), maupun tunai langsung di kantor Tata Usaha RTQ.
              </p>
              <div className="text-[11px] text-[#7A5B20] font-medium bg-amber-100/70 px-3 py-1.5 rounded-lg inline-block">
                Konfirmasi pembayaran ke Staf Keuangan TU RTQ Abdurrahman bin Auf.
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   BROSUR RESMI PPDB 2026/2027 SECTION (1 BROSUR TUNGGAL)
──────────────────────────────────────────────────────── */
function BrosurSpmbSection() {
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  const posterData = {
    title: "Poster Resmi PPDB TA 2026/2027",
    institution: "Rumah Tahfidz Qur'an Abdurrahman bin Auf",
    src: "/brosur-ppdb-2026.jpg",
    downloadName: "Brosur-PPDB-2026-RTQ-ABA.jpg",
    address: "Jl. Hasanudin No 81 Banyuwangi",
    phone: "0852-1218-5139",
    waUrl: "https://wa.me/6285212185139?text=Assalamu'alaikum%20Panitia%20PPDB%20RTQ%20Abdurrahman%20bin%20Auf,%20saya%20ingin%20konsultasi%20mengenai%20brosur%20resmi%20PPDB%202026/2027.",
    programs: [
      {
        icon: "📖",
        title: "Tahsin 8 JP",
        sub: "Tahsin Al-Qur'an Intensif",
        desc: "Pembinaan tajwid, makharijul huruf, dan talaqqi intensif agar bacaan santri fasih, tartil, dan ber-sanad."
      },
      {
        icon: "📋",
        title: "11 Mapel Lengkap",
        sub: "Kurikulum Lengkap Berstandar",
        desc: "Integrasi mata pelajaran Diniyah (Fiqih, Aqidah, Hadits, Bahasa Arab) serta pelajaran umum kesetaraan SD/MI."
      },
      {
        icon: "🧠",
        title: "Deep Learning STEM",
        sub: "Sains Teknologi Inovasi",
        desc: "Pendekatan belajar modern berbasis sains, eksplorasi teknologi, logika matematika, serta dasar coding & AI."
      },
      {
        icon: "📈",
        title: "Kurva S Monitoring",
        sub: "Pemantauan Perkembangan Santri",
        desc: "Evaluasi terukur dan pelaporan berkala grafik capaian hafalan, pemahaman materi, serta adab harian santri."
      }
    ]
  };

  return (
    <section id="brosur" className="py-16 sm:py-24 bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F4] to-[#F5EFE6] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0c3624]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DEAB3E]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c3624]/10 text-[#0c3624] text-xs font-bold uppercase tracking-wider mb-3 border border-[#0c3624]/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#DEAB3E] animate-pulse"></span>
            Brosur Resmi PPDB TA 2026/2027
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0c3624] tracking-tight font-serif mb-3">
            Brosur Promosi Pendaftaran
          </h2>
          <div className="w-16 h-1 bg-[#DEAB3E] rounded-full mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Informasi resmi Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Rumah Tahfidz Qur&apos;an Abdurrahman bin Auf. Anda dapat melihat dalam resolusi tinggi atau mengunduh berkas poster di bawah ini.
          </p>
        </div>

        {/* 2-Column Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#e8dfcf] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* LEFT COLUMN (5 SPAN): THE POSTER DISPLAY */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#0c3624] to-[#072418] p-5 sm:p-7 flex flex-col items-center justify-between text-white relative">
              {/* Badge Poster */}
              <div className="w-full flex items-center justify-between mb-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[#DEAB3E] font-bold text-xs tracking-wider border border-[#DEAB3E]/40 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#DEAB3E]"></span>
                  Poster Resmi PPDB
                </span>
                <span className="text-[11px] font-semibold text-emerald-200 bg-white/10 px-2.5 py-1 rounded-lg">
                  Resolusi Tinggi
                </span>
              </div>

              {/* Poster Image Container with Zoom Overlay */}
              <div 
                className="relative w-full max-w-[360px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DEAB3E]/40 cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => setShowLightbox(true)}
              >
                <img
                  src={posterData.src}
                  alt={posterData.title}
                  className="w-full h-auto object-contain block bg-neutral-900"
                />
                
                {/* Hover overlay with Zoom hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="inline-flex items-center justify-center gap-2 bg-[#DEAB3E] text-[#0c3624] font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg mb-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span>Klik untuk Memperbesar Resolusi Penuh</span>
                  </span>
                  <span className="text-[10px] text-center text-white/80">
                    Bisa diperbesar dan diunduh langsung
                  </span>
                </div>
              </div>

              {/* Quick Actions Under Poster */}
              <div className="w-full max-w-[360px] flex items-center gap-2 mt-4 pt-3 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setShowLightbox(true)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 border border-white/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>Perbesar</span>
                </button>
                <a
                  href={posterData.src}
                  download={posterData.downloadName}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#DEAB3E] hover:bg-[#cf9e33] text-[#0c3624] font-black text-xs transition flex items-center justify-center gap-1.5 shadow"
                  title="Unduh file gambar poster"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh Poster</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN (7 SPAN): DETAILED PROGRAM UNGGULAN & ACTIONS */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#9B7B3B] mb-1">
                  Penerimaan Peserta Didik Baru (PPDB) TA 2026/2027
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c3624] font-serif mb-2">
                  Rumah Tahfidz Qur&apos;an Abdurrahman bin Auf
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  Mencetak generasi santri penghafal Al-Qur&apos;an yang fasih membaca, tartil menghafal, berakhlak karimah, serta siap menghadapi era modern melalui sains dan teknologi inovasi.
                </p>

                {/* 4 Program Unggulan Grid (Matching the Poster) */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c3624] mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DEAB3E]"></span>
                    <span>4 Program Unggulan (Sesuai Brosur):</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {posterData.programs.map((prog, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#e8dfcf] hover:border-[#DEAB3E] transition-colors"
                      >
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="w-8 h-8 rounded-xl bg-[#0c3624] text-white flex items-center justify-center text-sm shadow-xs">
                            {prog.icon}
                          </span>
                          <div>
                            <div className="font-extrabold text-xs sm:text-sm text-[#0c3624]">
                              {prog.title}
                            </div>
                            <div className="text-[10.5px] font-semibold text-[#7A5B20]">
                              {prog.sub}
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-600 leading-relaxed">
                          {prog.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight Kontak & Alamat Resmi dari Brosur */}
                <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-emerald-200 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-bold text-[#0c3624] flex items-center gap-1.5">
                      <span>📍</span>
                      <span>{posterData.address}</span>
                    </div>
                    <div className="font-medium text-emerald-800 flex items-center gap-1.5">
                      <span>📱</span>
                      <span>WhatsApp Panitia: <strong>{posterData.phone}</strong></span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-[11px] whitespace-nowrap shadow-xs">
                    Kuota: 15 Santri
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("pendaftaran")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-1 min-w-[170px] py-3.5 px-5 rounded-2xl bg-[#0c3624] hover:bg-[#134932] text-[#F1D9A6] font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Daftar Online Sekarang</span>
                  <span>→</span>
                </button>

                <a
                  href={posterData.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-2xl bg-[#E8B54D] hover:bg-[#cf9e33] text-[#0c3624] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-[#0c3624]" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                  </svg>
                  <span>Konsultasi Panitia</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for High-Resolution View */}
      {showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[95vh] bg-[#1a231f] rounded-2xl sm:rounded-3xl border border-[#DEAB3E]/40 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 bg-[#0c3624] border-b border-[#DEAB3E]/30 flex items-center justify-between">
              <div>
                <div className="text-xs text-[#DEAB3E] font-bold tracking-wider uppercase mb-0.5">
                  Brosur Resmi PPDB TA 2026/2027 • Tampilan Resolusi Penuh
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white font-serif">
                  {posterData.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={posterData.src}
                  download={posterData.downloadName}
                  className="px-3.5 py-1.5 rounded-lg bg-[#DEAB3E] hover:bg-[#cf9e33] text-[#0c3624] text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                  title="Unduh Gambar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Unduh</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowLightbox(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all text-lg font-bold"
                  aria-label="Tutup Pratinjau"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Image Body with Zoom/Scroll */}
            <div className="flex-1 overflow-auto p-2 sm:p-4 bg-neutral-950 flex items-center justify-center max-h-[75vh]">
              <img
                src={posterData.src}
                alt={posterData.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-[#0c3624]/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Gunakan scroll atau cubit layar untuk memperbesar tampilan teks pada poster.
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={posterData.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#DEAB3E] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Hubungi Panitia (0852-1218-5139)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
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

  const [filePendaftaran, setFilePendaftaran] = useState<File | null>(null);
  const [fileKesantrian, setFileKesantrian] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isFilesUploaded = Boolean(filePendaftaran && fileKesantrian);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
    type: "pendaftaran" | "kesantrian",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    if (type === "pendaftaran") {
      setFilePendaftaran(file);
    } else {
      setFileKesantrian(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filePendaftaran || !fileKesantrian) {
      alert("Mohon unggah kedua berkas formulir (Form Pendaftaran & Paket Formulir Kesantrian) terlebih dahulu!");
      return;
    }

    const text = `Assalamu'alaikum Admin Panitia SPMB RTQ Abdurrahman bin Auf,%0A%0ASaya ingin mengirimkan PENDAFTARAN SANTRI BARU T.A. 2026/2027:%0A%0A📋 DATA SANTRI:%0A- Nama Santri: ${formData.namaSantri}%0A- TTL: ${formData.ttl}%0A- Gender: ${formData.gender}%0A- Usia: ${formData.usia} Tahun%0A- Nama Ayah: ${formData.namaAyah}%0A- Nama Ibu: ${formData.namaIbu}%0A- No. WA Ortu: ${formData.noWa}%0A- Alamat: ${formData.alamat}%0A- Program Pilihan: ${formData.program}%0A%0A📎 BERKAS FORMULIR TERLAMPIR (TELAH DIISI):%0A1. Form Pendaftaran: ${filePendaftaran.name} (${(filePendaftaran.size / 1024).toFixed(1)} KB)%0A2. Paket Formulir Kesantrian: ${fileKesantrian.name} (${(fileKesantrian.size / 1024).toFixed(1)} KB)%0A%0ABerkas dokumen tersebut telah siap untuk diverifikasi. Mohon panduan tahapan selanjutnya. Terima kasih!`;
    
    window.open(`https://wa.me/6285212185139?text=${text}`, "_blank");
    setShowSuccessModal(true);
  };

  const requirements = [
    "Usia minimal 7 tahun per Juli 2026 – 12 tahun",
    "Pas foto 3 x 4 latar merah (3 lembar)",
    "Fotocopy Kartu Keluarga / KK (3 lembar)",
    "Fotocopy Akte Kelahiran (3 lembar)",
    "Fotocopy rapor terakhir (khusus siswa pindahan)",
    "Sehat jasmani & rohani",
  ];

  const steps = [
    {
      num: 1,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      title: "Ambil Formulir",
      desc: "Di kantor RTQ Abdurrahman Bin Auf",
    },
    {
      num: 2,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      ),
      title: "Isi & Lengkapi",
      desc: "Lengkapi berkas pendaftaran santri",
    },
    {
      num: 3,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Kumpulkan Berkas",
      desc: "Serahkan ke Panitia SPMB RTQ",
    },
    {
      num: 4,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      ),
      title: "Biaya Pendaftaran",
      desc: "Membayar biaya Rp 100.000",
    },
    {
      num: 5,
      icon: (
        <svg className="w-6 h-6 fill-[#0c3624]" viewBox="0 0 24 24">
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
        </svg>
      ),
      title: "Daftar Ulang",
      desc: "Pelunasan / cicilan Uang Pangkal",
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

            {/* Periode Pendaftaran (Gelombang 1 & 2 Sesuai Brosur) */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#0c3624] to-[#124b33] text-white shadow-sm border border-emerald-900/40">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-[#F1D9A6] uppercase tracking-wider flex items-center gap-1.5">
                  <span>📅</span> Periode Pendaftaran SPMB 2026–2027
                </span>
                <span className="text-[10px] font-bold bg-[#DEAB3E] text-[#0c3624] px-2.5 py-0.5 rounded-full">
                  Resmi
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <div className="text-[#DEAB3E] font-bold text-[10.5px] uppercase tracking-wide">GELOMBANG 1 :</div>
                  <div className="font-extrabold text-white text-sm mt-0.5">01 NOV 25 – 31 JAN 26</div>
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <div className="text-[#DEAB3E] font-bold text-[10.5px] uppercase tracking-wide">GELOMBANG 2 :</div>
                  <div className="font-extrabold text-white text-sm mt-0.5">01 FEB 26 – 30 JUNI 26*</div>
                </div>
              </div>
              <p className="text-[10px] text-white/70 italic mt-2">
                * Gelombang 2 tidak dibuka jika kuota sudah terpenuhi
              </p>
            </div>

            {/* Persyaratan Pendaftaran */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-black text-[#0c3624] mb-3">
                Syarat Pendaftaran:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5 p-2 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                    <span className="w-5 h-5 rounded-full bg-[#E8B54D] text-[#0c3624] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 shadow-xs">
                      ✓
                    </span>
                    <span className="text-xs text-neutral-700 font-medium leading-snug">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5 Alur Pendaftaran */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0c3624] mb-5">
                Alur Pendaftaran (5 Langkah):
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 relative">
                {steps.map((s) => (
                  <div
                    key={s.num}
                    className="relative bg-white border border-neutral-200/80 rounded-2xl p-3 pt-5 flex flex-col items-center text-center shadow-xs hover:border-[#DEAB3E] transition"
                  >
                    {/* Number Badge on top */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#E8B54D] text-[#0c3624] font-black text-xs flex items-center justify-center shadow-xs">
                      {s.num}
                    </div>

                    <div className="text-xl mb-1.5 mt-1">{s.icon}</div>
                    <h4 className="font-bold text-[11px] text-[#0c3624] leading-tight mb-1">
                      {s.title}
                    </h4>
                    <p className="text-[9.5px] text-neutral-500 leading-tight">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Box Unduh Template Formulir & Arahan Pendaftaran */}
            <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0c3624] via-[#10432e] to-[#0c3624] text-white shadow-lg border border-[#DEAB3E]/40 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DEAB3E]/20 text-[#DEAB3E] text-[11px] font-bold uppercase tracking-wider mb-2.5 border border-[#DEAB3E]/30">
                  <span>📥</span> Unduh Template Berkas Resmi
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
                  Berkas Formulir Pendaftaran (Wajib Diisi)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-4">
                  Sebelum mengirim pendaftaran online, calon wali santri <strong>wajib mengunduh 2 berkas template</strong> di bawah ini, melengkapinya, lalu mengunggahnya kembali pada formulir online di samping.
                </p>

                {/* 2 Download Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {/* Download Form 1 */}
                  <a
                    href="/Form-Pendaftaran-RTQ-ABA.docx"
                    download="Form pendaftaran.docx"
                    className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#DEAB3E] transition-all flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DEAB3E] text-[#0c3624] flex items-center justify-center text-lg font-black flex-shrink-0 group-hover:scale-105 transition-transform shadow">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-white group-hover:text-[#DEAB3E] transition-colors truncate">
                        Form pendaftaran.docx
                      </div>
                      <div className="text-[10.5px] text-neutral-300">
                        Identitas Calon Siswa &amp; Data Orang Tua
                      </div>
                      <div className="text-[9.5px] text-[#DEAB3E] font-semibold mt-1 flex items-center gap-1">
                        <span>⬇️ Unduh Template (77 KB)</span>
                      </div>
                    </div>
                  </a>

                  {/* Download Form 2 */}
                  <a
                    href="/Paket-Formulir-Kesantrian-RTQ-ABA.docx"
                    download="Paket Formulir Kesantrian.docx"
                    className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#DEAB3E] transition-all flex items-start gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DEAB3E] text-[#0c3624] flex items-center justify-center text-lg font-black flex-shrink-0 group-hover:scale-105 transition-transform shadow">
                      📑
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-white group-hover:text-[#DEAB3E] transition-colors truncate">
                        Paket Formulir Kesantrian.docx
                      </div>
                      <div className="text-[10.5px] text-neutral-300">
                        Pernyataan Wali Santri &amp; Tata Tertib
                      </div>
                      <div className="text-[9.5px] text-[#DEAB3E] font-semibold mt-1 flex items-center gap-1">
                        <span>⬇️ Unduh Template (93 KB)</span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Petunjuk / Arahan Langkah Demi Langkah */}
                <div className="p-3.5 rounded-2xl bg-black/25 border border-white/10 text-xs">
                  <div className="font-bold text-[#DEAB3E] text-[11px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>💡</span> Arahan &amp; Petunjuk Pengisian:
                  </div>
                  <ol className="space-y-1.5 text-neutral-200 text-[11.5px] list-decimal list-inside leading-relaxed">
                    <li><strong>Unduh Template:</strong> Klik kedua tombol di atas untuk mengunduh file <em>Form pendaftaran.docx</em> dan <em>Paket Formulir Kesantrian.docx</em>.</li>
                    <li><strong>Isi &amp; Lengkapi:</strong> Buka berkas di Microsoft Word (laptop/HP) atau cetak (print) lalu isi tulisan tangan secara lengkap.</li>
                    <li><strong>Simpan Berkas:</strong> Simpan file yang telah diisi (format <em>.docx / .pdf</em>), atau foto/scan dokumen jika ditulis tangan.</li>
                    <li><strong>Unggah pada Formulir:</strong> Isi biodata singkat di formulir online (sebelah kanan), lalu <strong>wajib unggah kedua berkas</strong> pada kolom upload.</li>
                    <li><strong>Kirim Pendaftaran:</strong> Setelah kedua berkas terunggah, tombol <strong>Kirim Pendaftaran</strong> akan aktif untuk menyelesaikan pendaftaran.</li>
                  </ol>
                </div>
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

                {/* ────────────────────────────────────────────────────────
                    BAGIAN UPLOAD 2 BERKAS FORMULIR WAJIB
                ──────────────────────────────────────────────────────── */}
                <div className="pt-4 border-t border-neutral-200/90">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#0c3624] flex items-center gap-1.5">
                      <span>📎</span>
                      <span>Unggah 2 Berkas Formulir (Wajib)</span>
                    </label>
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      * Wajib Diupload
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mb-3">
                    Unggah berkas yang telah Anda isi (.docx, .pdf, atau foto scan dokumen maks. 10MB per file).
                  </p>

                  <div className="space-y-3">
                    {/* File 1: Form pendaftaran.docx */}
                    <div className={`p-3 rounded-2xl border transition-all ${
                      filePendaftaran
                        ? "bg-emerald-50/80 border-emerald-300"
                        : "bg-[#F8F9FA] border-dashed border-neutral-300 hover:border-[#0c3624]"
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="text-[11px] font-bold text-[#0c3624] flex items-center gap-1">
                          <span>1.</span>
                          <span>Berkas Form Pendaftaran</span>
                          <span className="text-red-500">*</span>
                        </div>
                        {filePendaftaran ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span>✓</span> Terunggah
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                            Belum Ada File
                          </span>
                        )}
                      </div>

                      {filePendaftaran ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-lg">📄</span>
                            <div className="truncate">
                              <div className="font-bold text-[#0c3624] truncate">{filePendaftaran.name}</div>
                              <div className="text-[10px] text-neutral-400">
                                {(filePendaftaran.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFilePendaftaran(null)}
                            className="p-1 px-2 text-[10px] font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            ✕ Hapus
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-3 cursor-pointer bg-white rounded-xl border border-neutral-200 hover:bg-neutral-50 transition text-center group">
                          <input
                            type="file"
                            accept=".docx,.doc,.pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("pendaftaran", e)}
                            className="hidden"
                          />
                          <span className="text-xl mb-0.5 group-hover:scale-110 transition-transform">📄</span>
                          <span className="text-xs font-bold text-[#0c3624] group-hover:underline">
                            Pilih Berkas Form Pendaftaran
                          </span>
                          <span className="text-[10px] text-neutral-400 mt-0.5">
                            Format: .docx, .pdf, atau foto scan
                          </span>
                        </label>
                      )}
                    </div>

                    {/* File 2: Paket Formulir Kesantrian.docx */}
                    <div className={`p-3 rounded-2xl border transition-all ${
                      fileKesantrian
                        ? "bg-emerald-50/80 border-emerald-300"
                        : "bg-[#F8F9FA] border-dashed border-neutral-300 hover:border-[#0c3624]"
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="text-[11px] font-bold text-[#0c3624] flex items-center gap-1">
                          <span>2.</span>
                          <span>Berkas Paket Formulir Kesantrian</span>
                          <span className="text-red-500">*</span>
                        </div>
                        {fileKesantrian ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span>✓</span> Terunggah
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                            Belum Ada File
                          </span>
                        )}
                      </div>

                      {fileKesantrian ? (
                        <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-lg">📑</span>
                            <div className="truncate">
                              <div className="font-bold text-[#0c3624] truncate">{fileKesantrian.name}</div>
                              <div className="text-[10px] text-neutral-400">
                                {(fileKesantrian.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFileKesantrian(null)}
                            className="p-1 px-2 text-[10px] font-bold text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            ✕ Hapus
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-3 cursor-pointer bg-white rounded-xl border border-neutral-200 hover:bg-neutral-50 transition text-center group">
                          <input
                            type="file"
                            accept=".docx,.doc,.pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange("kesantrian", e)}
                            className="hidden"
                          />
                          <span className="text-xl mb-0.5 group-hover:scale-110 transition-transform">📑</span>
                          <span className="text-xs font-bold text-[#0c3624] group-hover:underline">
                            Pilih Berkas Formulir Kesantrian
                          </span>
                          <span className="text-[10px] text-neutral-400 mt-0.5">
                            Format: .docx, .pdf, atau foto scan
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Notice & Validasi Upload */}
                {!isFilesUploaded ? (
                  <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5 shadow-2xs">
                    <span className="text-lg mt-0.5">⚠️</span>
                    <div>
                      <div className="font-bold">Kedua Berkas Formulir Wajib Diunggah</div>
                      <div className="text-[11px] text-amber-800 leading-snug">
                        Tombol kirim pendaftaran dinonaktifkan sampai Anda mengunggah <strong>Form pendaftaran</strong> dan <strong>Paket Formulir Kesantrian</strong>.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5 shadow-2xs">
                    <span className="text-lg mt-0.5">✅</span>
                    <div>
                      <div className="font-bold">Kedua Berkas Lengkap &amp; Siap Dikirim!</div>
                      <div className="text-[11px] text-emerald-800 leading-snug">
                        Formulir telah dipilih. Klik tombol di bawah untuk mengirim data pendaftaran ke Panitia SPMB.
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFilesUploaded}
                  className={`w-full py-3.5 font-black text-xs sm:text-sm rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 mt-2 text-center ${
                    isFilesUploaded
                      ? "bg-[#E8B54D] hover:bg-[#d9a338] text-[#0c3624] transform hover:-translate-y-0.5 cursor-pointer shadow-gold"
                      : "bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed"
                  }`}
                >
                  <span>KIRIM PENDAFTARAN</span>
                  <span>{isFilesUploaded ? "🚀" : "🔒 (Upload 2 Formulir Dahulu)"}</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* Modal Sukses Pendaftaran */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-neutral-100">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
              🎉
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0c3624] font-serif mb-2">
              Pendaftaran Online Terkirim!
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
              Data santri dan informasi 2 berkas formulir telah berhasil diproses. Chat WhatsApp resmi Panitia SPMB RTQ Abdurrahman bin Auf telah terbuka otomatis.
            </p>
            <div className="bg-[#FAF8F4] p-3.5 rounded-2xl border border-neutral-200 text-left text-xs space-y-2 mb-5">
              <div className="font-bold text-[#0c3624] flex items-center gap-1.5">
                <span>📋</span>
                <span>Langkah Selanjutnya:</span>
              </div>
              <div className="text-neutral-700 flex items-start gap-2">
                <span className="font-bold text-[#0c3624]">1.</span>
                <span>Kirimkan pesan WhatsApp yang telah disiapkan ke nomor Panitia (<strong>0852-1218-5139</strong>).</span>
              </div>
              <div className="text-neutral-700 flex items-start gap-2">
                <span className="font-bold text-[#0c3624]">2.</span>
                <span>Lampirkan kedua file dokumen yang telah Anda isi (<strong>{filePendaftaran?.name}</strong> &amp; <strong>{fileKesantrian?.name}</strong>) pada chat WhatsApp tersebut sebagai arsip resmi.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#0c3624] hover:bg-[#134932] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow"
            >
              Mengerti &amp; Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────
   KONTAK KAMI & MEDIA SOSIAL (Matching Reference Screenshot)
──────────────────────────────────────────────────────── */
function ContactSection() {
  const [mapMode, setMapMode] = useState<"mockup" | "google">("mockup");
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
                      Jl. Hasanudin No. 81 Krajan I, Kembiritan, Kec. Genteng, Kabupaten Banyuwangi, Jawa Timur 68465
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

            {/* 2. Lokasi Kami (Matching Mockup Reference & Live Google Maps) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-neutral-200/80">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="font-black text-lg text-[#0c3624]">
                  Lokasi Kami
                </h3>
                {/* Switcher Mode: Desain Mockup vs Google Maps */}
                <div className="inline-flex p-0.5 bg-neutral-100 rounded-xl border border-neutral-200 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setMapMode("mockup")}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      mapMode === "mockup"
                        ? "bg-white text-[#0c3624] font-bold shadow-xs"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    🗺️ Peta Desain
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode("google")}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      mapMode === "google"
                        ? "bg-white text-[#0c3624] font-bold shadow-xs"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    📍 Google Maps
                  </button>
                </div>
              </div>

              {mapMode === "mockup" ? (
                /* Map Illustration Exactly from Mockup (1:1) */
                <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-xs group bg-[#f5f3eb]">
                  <div className="relative w-full h-[155px] sm:h-[185px] overflow-hidden">
                    <Image
                      src="/map-mockup.png"
                      alt="Peta Lokasi RTQ Banyuwangi"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    
                    {/* Hover Overlay Button to Open Google Maps Navigation */}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Jl.+Hasanudin+No.81,+Kembiritan,+Genteng,+Banyuwangi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <span className="bg-[#0c3624] hover:bg-[#E8B54D] hover:text-[#0c3624] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300">
                        <span>📍 Buka di Google Maps</span> ↗
                      </span>
                    </a>
                  </div>

                  {/* Address info footer bar */}
                  <div className="p-3 bg-[#FAF8F4] border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-800 font-medium">
                      <span className="text-[#DEAB3E] font-bold text-sm">📍</span>
                      <span className="line-clamp-1">Jl. Hasanudin No. 81, Kembiritan, Genteng, Banyuwangi</span>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Jl.+Hasanudin+No.81,+Kembiritan,+Genteng,+Banyuwangi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0c3624] hover:text-[#DEAB3E] hover:underline whitespace-nowrap self-end sm:self-auto"
                    >
                      <span>Petunjuk Arah</span> ↗
                    </a>
                  </div>
                </div>
              ) : (
                /* Live Interactive Google Maps Embed (No Grayscale, High Zoom) */
                <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
                  <div className="w-full h-[180px] sm:h-[220px]">
                    <iframe
                      title="Peta Lokasi RTQ Abdurrahman bin Auf"
                      src="https://maps.google.com/maps?q=Jl.+Hasanudin+No.81,+Kembiritan,+Genteng,+Banyuwangi&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-2.5 bg-[#FAF8F4] border-t border-neutral-200/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-600 line-clamp-1">
                      Jl. Hasanudin No. 81, Kembiritan, Kec. Genteng
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Jl.+Hasanudin+No.81,+Kembiritan,+Genteng,+Banyuwangi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#0c3624] hover:underline whitespace-nowrap ml-2"
                    >
                      Navigasi Penuh ↗
                    </a>
                  </div>
                </div>
              )}
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
                <span>Jl. Hasanudin No. 81 Krajan I, Kembiritan, Kec. Genteng, Banyuwangi, Jawa Timur 68465</span>
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
        <BrosurSpmbSection />
        <GallerySection />
        <PendaftaranSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
