import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu, X, Star, BookOpen, Heart, Users, Calendar,
  Mail, Phone, MapPin, Instagram, Youtube, Facebook,
  ChevronRight, Shield, Target, Zap, Award,
  ArrowRight, Globe, Clock, Moon, Sun,
} from "lucide-react";

// ── Dark Mode Context ─────────────────────────────────────────────────────────
const DarkModeContext = createContext();
const useDark = () => useContext(DarkModeContext);

const DarkModeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("osis-dark-mode");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { return false; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    try { localStorage.setItem("osis-dark-mode", dark); } catch {}
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, toggle: () => setDark(p => !p) }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// ── Utilities ─────────────────────────────────────────────────────────────────
const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
};

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Dark Mode Toggle ──────────────────────────────────────────────────────────
const DarkToggle = () => {
  const { dark, toggle } = useDark();
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      aria-label="Toggle dark mode"
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex-shrink-0 ${
        dark ? "bg-green-700" : "bg-gray-200"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ${
          dark ? "left-6 bg-amber-300" : "left-0.5 bg-white"
        }`}
      >
        {dark
          ? <Moon className="w-3 h-3 text-green-900" />
          : <Sun  className="w-3 h-3 text-amber-500" />
        }
      </motion.span>
    </motion.button>
  );
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "Organogram", "Events", "News"];

const Navbar = () => {
  const scrolled = useScrolled();
  const { dark } = useDark();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? "bg-gray-900/90 backdrop-blur-xl shadow-[0_2px_32px_rgba(0,0,0,0.4)] border-b border-white/5"
            : "bg-white/80 backdrop-blur-xl shadow-[0_2px_32px_rgba(20,83,45,0.08)] border-b border-white/60"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/40">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="leading-none">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-green-700 dark:text-green-400 uppercase">OSIS</p>
            <p className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">Insan Permata</p>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-400 transition-colors duration-200 group rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30"
              >
                {link}
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Right cluster */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center gap-3"
        >
          <DarkToggle />
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 bg-green-800 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200 shadow-lg shadow-green-900/20"
          >
            Hubungi Kami <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Mobile cluster */}
        <div className="md:hidden flex items-center gap-2">
          <DarkToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800"
          >
            <ul className="px-5 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-800 text-white text-sm font-semibold rounded-xl">
                  Hubungi Kami <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-stone-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/30 transition-colors duration-500"
    >
      {/* Decorative BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-100/60 to-amber-50/20 dark:from-amber-900/20 dark:to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-green-100/50 to-emerald-50/20 dark:from-green-900/30 dark:to-transparent blur-3xl" />
        <svg className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl opacity-[0.03] dark:opacity-[0.06]" viewBox="0 0 900 400">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#14532d" strokeWidth="1" />
          </pattern>
          <rect width="900" height="400" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-amber-600 dark:text-amber-400">
              OSIS SMPIT Insan Permata 2025/2026
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-5"
          >
            Generasi{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-emerald-400">
                Berakhlak
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-amber-200/60 dark:bg-amber-600/30 -z-0 rounded" />
            </span>
            ,{" "}<br />
            Berprestasi &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">
              Berdampak
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg"
          >
            OSIS SMPIT Insan Permata hadir sebagai wadah pengembangan diri siswa yang berkarakter islami,
            berwawasan luas, dan siap memberikan kontribusi nyata bagi sekolah dan masyarakat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#events"
              className="flex items-center gap-2.5 px-6 py-3 bg-green-800 dark:bg-green-700 text-white font-semibold rounded-2xl hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 shadow-xl shadow-green-900/25 hover:-translate-y-0.5"
            >
              Lihat Program Kerja <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              Kenali Kami
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex gap-8"
          >
            {[
              { value: "30+", label: "Anggota Aktif" },
              { value: "5",   label: "Seksi Bidang"  },
              { value: "8",   label: "Pengurus BPH"  },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ y }}
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-gray-300/60 dark:shadow-black/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700">
              <div className="absolute inset-0 opacity-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="absolute rounded-full border border-white"
                    style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-4">
                  <Star className="w-10 h-10 text-amber-300 fill-amber-300" />
                </div>
                <p className="text-2xl font-bold mb-1">SMPIT Insan Permata</p>
                <p className="text-green-200 text-sm">Organisasi Siswa Intra Sekolah</p>
                <div className="mt-6 px-4 py-2 bg-amber-400/20 border border-amber-400/30 rounded-full text-amber-200 text-xs font-medium">
                  Foto Kegiatan Siswa
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl shadow-gray-200/80 dark:shadow-black/40 border border-gray-100 dark:border-gray-700 flex items-center gap-3 max-w-[180px]"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Juara Umum</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">LDK 2024</p>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-4 bottom-10 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl shadow-gray-200/80 dark:shadow-black/40 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/40 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-700 dark:text-green-400" />
              </div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Anggota Aktif</p>
            </div>
            <div className="flex -space-x-2">
              {["#14532d", "#166534", "#15803d", "#16a34a"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: c }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-800 bg-amber-400 flex items-center justify-center text-white text-[9px] font-bold">
                +20
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-widest text-gray-400 dark:text-gray-600 uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-gray-300 dark:from-gray-600 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

// ── Vision & Mission ──────────────────────────────────────────────────────────
const visionContent =
  "Mewujudkan OSIS SMPIT Insan Permata sebagai organisasi siswa yang berakhlak mulia, berprestasi, kreatif, dan berdaya guna bagi sekolah, masyarakat, dan bangsa.";

const missionItems = [
  "Membina karakter islami dan kepemimpinan yang bertanggung jawab.",
  "Mengembangkan potensi akademik dan non-akademik seluruh siswa.",
  "Menyelenggarakan program kerja yang inovatif dan berdampak nyata.",
  "Membangun komunikasi yang harmonis antara siswa, guru, dan orang tua.",
  "Melestarikan nilai budaya dan identitas islami dalam setiap kegiatan.",
];

const values = [
  { icon: Shield,   title: "Integritas", desc: "Menjunjung tinggi kejujuran dan amanah dalam setiap tugas.", color: "green" },
  { icon: Heart,    title: "Empati",     desc: "Peduli terhadap sesama dan lingkungan sekitar.",              color: "rose"  },
  { icon: BookOpen, title: "Ilmu",       desc: "Semangat belajar tanpa henti untuk meraih prestasi.",         color: "blue"  },
  { icon: Globe,    title: "Kolaborasi", desc: "Bekerja bersama untuk mencapai tujuan yang lebih besar.",     color: "amber" },
];

const valueColors = {
  green: { bg: "bg-green-50 dark:bg-green-900/20", icon: "text-green-700 dark:text-green-400", border: "border-green-100 dark:border-green-800"   },
  rose:  { bg: "bg-rose-50 dark:bg-rose-900/20",   icon: "text-rose-600 dark:text-rose-400",   border: "border-rose-100 dark:border-rose-800"     },
  blue:  { bg: "bg-blue-50 dark:bg-blue-900/20",   icon: "text-blue-600 dark:text-blue-400",   border: "border-blue-100 dark:border-blue-800"     },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", icon: "text-amber-600 dark:text-amber-400", border: "border-amber-100 dark:border-amber-800"   },
};

const VisionMission = () => (
  <section id="about" className="py-24 bg-gradient-to-b from-white to-stone-50/50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <FadeUp className="text-center mb-16">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-amber-600 dark:text-amber-400 mb-3">
          Landasan Organisasi
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Visi, Misi & <span className="text-green-800 dark:text-green-400">Nilai Kami</span>
        </h2>
      </FadeUp>

      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        <FadeUp delay={0.1}>
          <div className="relative bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-8 text-white overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-amber-400/10 translate-y-1/3 -translate-x-1/3" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Visi</h3>
              <p className="text-green-100 leading-relaxed text-sm lg:text-base">{visionContent}</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-sm h-full transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800/50 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Misi</h3>
            <ul className="space-y-3">
              {missionItems.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map(({ icon: Icon, title, desc, color }, i) => {
          const c = valueColors[color];
          return (
            <FadeUp key={title} delay={i * 0.08}>
              <div className={`${c.bg} border ${c.border} rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full`}>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center mb-3 shadow-sm">
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1.5">{title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </div>
  </section>
);

// ── Organogram ────────────────────────────────────────────────────────────────
const orgData = {
  pembina: { name: "Ustadzah Risma", role: "Pembina OSIS" },
  head:    { name: "Tsabit",         role: "Ketua OSIS"   },
  bph: [
    { name: "Rima",   role: "Wakil Ketua"      },
    { name: "Sabiq",  role: "Sekretaris Utama" },
    { name: "Miza",   role: "Bendahara Utama"  },
    { name: "Sachi",  role: "Sekretaris II"    },
    { name: "Faiz",   role: "Bendahara II"     },
    { name: "Danish", role: "R&D"              },
    { name: "Safira", role: "HRD"              },
  ],
  divisions: [
    {
      id: 1, name: "Prestasi Akademik", color: "amber", coordinator: "Azka",
      members: [
        { name: "Azka",   tag: "Koordinator"   },
        { name: "Dhifa",  tag: null            },
        { name: "Keisha", tag: null            },
        { name: "Naura",  tag: null            },
        { name: "Fatih",  tag: null            },
        { name: "Faiz",   tag: "Pendamping BPH" },
        { name: "Tsabit", tag: "Pendamping BPH" },
      ],
    },
    {
      id: 2, name: "Seni", color: "rose", coordinator: "Kanaya",
      members: [
        { name: "Kanaya", tag: "Koordinator"   },
        { name: "Sachi",  tag: "Pendamping BPH" },
        { name: "Janit",  tag: null            },
        { name: "Miza",   tag: "Pendamping BPH" },
        { name: "Raihan", tag: null            },
      ],
    },
    {
      id: 3, name: "TIK", color: "blue", coordinator: "Kayyis",
      members: [
        { name: "Kayyis",  tag: "Koordinator"   },
        { name: "Sabrina", tag: null            },
        { name: "Maulana", tag: null            },
        { name: "Nayla",   tag: null            },
        { name: "Sabiq",   tag: "Pendamping BPH" },
        { name: "Athaya",  tag: null            },
        { name: "Rima",    tag: "Pendamping BPH" },
      ],
    },
    {
      id: 4, name: "Olahraga", color: "green", coordinator: "Gage",
      members: [
        { name: "Gage",   tag: "Koordinator"   },
        { name: "Alvaro", tag: null            },
        { name: "Ayasha", tag: null            },
        { name: "Cinda",  tag: null            },
        { name: "Safira", tag: "Pendamping BPH" },
      ],
    },
    {
      id: 5, name: "Kepribadian Unggul", color: "emerald", coordinator: "Najla",
      members: [
        { name: "Danish",  tag: "Pendamping BPH" },
        { name: "Lakei",   tag: null            },
        { name: "Maria",   tag: null            },
        { name: "Najla",   tag: "Koordinator"   },
        { name: "Zafran",  tag: null            },
        { name: "Dhafiya", tag: null            },
      ],
    },
  ],
};

const divColorConfig = {
  amber:   {
    grad:   "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10",
    border: "border-amber-200 dark:border-amber-800/60",
    hover:  "hover:border-amber-400 dark:hover:border-amber-600",
    badge:  "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
    dot:    "bg-amber-400",
    accent: "text-amber-700 dark:text-amber-400",
  },
  rose:    {
    grad:   "from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/10",
    border: "border-rose-200 dark:border-rose-800/60",
    hover:  "hover:border-rose-400 dark:hover:border-rose-600",
    badge:  "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
    dot:    "bg-rose-400",
    accent: "text-rose-700 dark:text-rose-400",
  },
  blue:    {
    grad:   "from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/10",
    border: "border-blue-200 dark:border-blue-800/60",
    hover:  "hover:border-blue-400 dark:hover:border-blue-600",
    badge:  "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    dot:    "bg-blue-400",
    accent: "text-blue-700 dark:text-blue-400",
  },
  green:   {
    grad:   "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10",
    border: "border-green-200 dark:border-green-800/60",
    hover:  "hover:border-green-400 dark:hover:border-green-600",
    badge:  "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    dot:    "bg-green-500",
    accent: "text-green-700 dark:text-green-400",
  },
  emerald: {
    grad:   "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10",
    border: "border-emerald-200 dark:border-emerald-800/60",
    hover:  "hover:border-emerald-400 dark:hover:border-emerald-600",
    badge:  "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
    dot:    "bg-emerald-500",
    accent: "text-emerald-700 dark:text-emerald-400",
  },
};

const BphCard = ({ name, role }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.03 }}
    transition={{ duration: 0.18 }}
    className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 cursor-default"
  >
    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 mx-auto mb-2 flex items-center justify-center">
      <span className="text-xs font-bold text-green-700 dark:text-green-400">
        {name.slice(0, 2).toUpperCase()}
      </span>
    </div>
    <p className="font-bold text-gray-900 dark:text-white text-xs leading-tight mb-0.5">{name}</p>
    <p className="text-[10px] text-green-700 dark:text-green-400 font-semibold">{role}</p>
  </motion.div>
);

const SekbidCard = ({ division }) => {
  const [open, setOpen] = useState(false);
  const cfg = divColorConfig[division.color];
  return (
    <motion.div layout className={`bg-gradient-to-br ${cfg.grad} border ${cfg.border} ${cfg.hover} rounded-2xl overflow-hidden transition-colors duration-300`}>
      <button onClick={() => setOpen(!open)} className="w-full p-5 text-left flex items-start gap-4 group">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black ${cfg.badge}`}>
          {division.id}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-0.5">Sekbid {division.id}</p>
          <p className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{division.name}</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
            Koor: <span className={`font-semibold ${cfg.accent}`}>{division.coordinator}</span>
            <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
            {division.members.length} anggota
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 mt-1">
          <ChevronRight className={`w-4 h-4 ${cfg.accent}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="members"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/60 dark:border-gray-700/60 pt-3 space-y-2">
              {division.members.map(({ name, tag }, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{name}</span>
                  {tag && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${cfg.badge}`}>{tag}</span>}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Organogram = () => (
  <section id="organogram" className="py-24 bg-gradient-to-b from-stone-50/50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <FadeUp className="text-center mb-16">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 dark:text-green-400 mb-3">
          Struktur Organisasi
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Pengurus OSIS <span className="text-green-800 dark:text-green-400">2025/2026</span>
        </h2>
        <p className="text-gray-400 dark:text-gray-500 mt-3 max-w-md mx-auto text-sm">
          Mengenal para pemimpin yang berdedikasi untuk kemajuan sekolah kita bersama.
        </p>
      </FadeUp>

      {/* Pembina */}
      <FadeUp className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-700/50 rounded-2xl shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
            <span className="text-xs font-black text-amber-700 dark:text-amber-400">
              {orgData.pembina.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">Pembina</p>
            <p className="font-bold text-gray-900 dark:text-white text-sm">{orgData.pembina.name}</p>
          </div>
        </div>
      </FadeUp>

      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-8 bg-gradient-to-b from-amber-300 to-green-300 dark:from-amber-600 dark:to-green-600" />
      </div>

      {/* Ketua */}
      <FadeUp className="max-w-[200px] mx-auto mb-4">
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-5 text-center border border-green-700 shadow-xl shadow-green-900/30 cursor-default"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-400 mx-auto mb-3 flex items-center justify-center">
            <span className="text-sm font-black text-white">
              {orgData.head.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="font-black text-white text-sm mb-0.5">{orgData.head.name}</p>
          <p className="text-amber-300 text-[11px] font-semibold">{orgData.head.role}</p>
        </motion.div>
      </FadeUp>

      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-8 bg-gradient-to-b from-green-800 to-green-300 dark:from-green-600 dark:to-green-900" />
      </div>

      {/* BPH */}
      <FadeUp delay={0.1} className="mb-10">
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-gradient-to-r from-transparent via-green-200 dark:via-green-800 to-transparent" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-6">
            {orgData.bph.map((member, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-green-200 dark:bg-green-800" />
                <BphCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Divider */}
      <FadeUp delay={0.15} className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300 dark:to-amber-600" />
          <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">Seksi Bidang</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300 dark:to-amber-600" />
        </div>
        <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-2">Klik kartu untuk melihat anggota lengkap</p>
      </FadeUp>

      {/* Sekbid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orgData.divisions.map((div, i) => (
          <FadeUp key={div.id} delay={i * 0.07}>
            <SekbidCard division={div} />
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── Events ────────────────────────────────────────────────────────────────────


const eventBadgeMap = {
  green:   "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50",
  amber:   "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800/50",
  blue:    "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
  rose:    "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800/50",
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/50",
  purple:  "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/50",
};

const eventHeaderGrad = {
  green:   "from-green-800 to-green-700",
  amber:   "from-amber-500 to-amber-400",
  blue:    "from-blue-700 to-blue-600",
  rose:    "from-rose-600 to-rose-500",
  emerald: "from-emerald-700 to-emerald-600",
  purple:  "from-purple-700 to-purple-600",
};

const Events = () => (
  <section id="events" className="py-24 bg-gradient-to-b from-white via-stone-50/30 to-white dark:from-gray-900 dark:via-gray-950/50 dark:to-gray-900 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <FadeUp className="text-center mb-16">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-amber-600 dark:text-amber-400 mb-3">
          Program Kerja
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Kegiatan & <span className="text-amber-500">Event</span>
        </h2>
        <p className="text-gray-400 dark:text-gray-500 mt-3 max-w-md mx-auto text-sm">
          Rangkaian program kerja OSIS yang dirancang untuk mengembangkan potensi seluruh siswa.
        </p>
      </FadeUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map(({ title, date, category, color, desc, status }, i) => (
          <FadeUp key={title} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-black/30 transition-all duration-300 h-full flex flex-col"
            >
              <div className={`h-36 bg-gradient-to-br ${eventHeaderGrad[color]} relative overflow-hidden flex items-end justify-start p-4`}>
                <div className="absolute inset-0 opacity-10">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="absolute rounded-full border border-white"
                      style={{ width: j * 80, height: j * 80, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
                  ))}
                </div>
                <div className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  status === "upcoming" ? "bg-amber-400 text-amber-900" : "bg-white/20 text-white"
                }`}>
                  {status === "upcoming" ? "Akan Datang" : "Selesai"}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${eventBadgeMap[color]}`}>{category}</span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{date}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-2 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{desc}</p>
                <button className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 group/btn transition-colors">
                  Selengkapnya
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── News ──────────────────────────────────────────────────────────────────────
const news = [
  {
    title:    "OSIS Insan Permata Raih Juara 1 Lomba Pidato Bahasa Arab Tingkat Kota",
    date:     "28 Des 2024",
    category: "Prestasi",
    excerpt:  "Siswa utusan OSIS berhasil meraih juara pertama dalam lomba pidato bahasa Arab yang diselenggarakan oleh Kemenag Kota...",
    color:    "amber",
  },
  {
    title:    "Launching Program Literasi Digital: Bijak Bermedsos untuk Pelajar",
    date:     "15 Des 2024",
    category: "Program",
    excerpt:  "OSIS bersama guru TIK meluncurkan program edukasi literasi digital untuk meningkatkan kesadaran siswa dalam penggunaan media sosial...",
    color:    "blue",
  },
  {
    title:    "Laporan Kegiatan Bakti Sosial: Berbagi di Yayasan Ar-Rahman",
    date:     "8 Nov 2024",
    category: "Sosial",
    excerpt:  "Pengurus OSIS dan seluruh siswa kelas VIII berhasil mengumpulkan donasi untuk 50 anak yatim di Yayasan Ar-Rahman...",
    color:    "green",
  },
];

const newsBg = {
  amber: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-950/20",
  blue:  "bg-gradient-to-br from-blue-100 to-sky-50 dark:from-blue-900/30 dark:to-sky-950/20",
  green: "bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-950/20",
};

const newsCatBadge = {
  amber: "bg-amber-400 text-amber-900",
  blue:  "bg-blue-600 text-white",
  green: "bg-green-700 text-white",
};

const News = () => (
  <section id="news" className="py-24 bg-gradient-to-b from-white to-stone-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 dark:text-green-400 mb-3">
            Berita Terkini
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Kabar OSIS <span className="text-green-800 dark:text-green-400">Terbaru</span>
          </h2>
        </div>
        <a href="#" className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 group transition-colors flex-shrink-0">
          Semua Berita <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </FadeUp>

      <div className="grid lg:grid-cols-3 gap-6">
        {news.map(({ title, date, category, excerpt, color }, i) => (
          <FadeUp key={title} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-gray-100/80 dark:hover:shadow-black/30 transition-all duration-300 h-full flex flex-col cursor-pointer"
            >
              <div className={`h-44 relative overflow-hidden ${newsBg[color]}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${newsCatBadge[color]}`}>{category}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{date}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-3 group-hover:text-green-800 dark:group-hover:text-green-400 transition-colors flex-1">
                  {title}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed mb-4 line-clamp-2">{excerpt}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400 group-hover:text-green-800 dark:group-hover:text-green-300">
                  Baca Selengkapnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA Banner ────────────────────────────────────────────────────────────────
const CTABanner = () => (
  <section className="py-16 px-5 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <FadeUp>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-900 to-green-950 p-10 lg:p-16 text-center text-white">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-amber-300 mb-4">
              Bergabung Bersama Kami
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
              Punya Semangat & Ide?<br />
              <span className="text-amber-300">Ayo Bergerak Bersama!</span>
            </h2>
            <p className="text-green-200 max-w-xl mx-auto text-sm mb-8 leading-relaxed">
              OSIS SMPIT Insan Permata selalu membuka ruang bagi siswa yang ingin berkontribusi,
              berinovasi, dan bertumbuh bersama untuk sekolah yang lebih baik.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#contact" className="px-6 py-3 bg-amber-400 text-amber-900 font-bold rounded-2xl hover:bg-amber-300 transition-colors text-sm shadow-xl shadow-amber-900/30">
                Hubungi Pengurus
              </a>
              <a href="#events" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-colors text-sm backdrop-blur">
                Lihat Kegiatan
              </a>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer id="contact" className="bg-gray-950 text-gray-400 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] text-amber-400 uppercase">OSIS</p>
              <p className="text-sm font-bold text-white">Insan Permata</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed mb-5 text-gray-500">
            Organisasi Siswa Intra Sekolah SMPIT Insan Permata — Membangun Generasi Berakhlak, Berprestasi, dan Berdampak.
          </p>
          <div className="flex gap-3">
            {[{ icon: Instagram, label: "Instagram" }, { icon: Youtube, label: "YouTube" }, { icon: Facebook, label: "Facebook" }].map(({ icon: Icon, label }) => (
              <a key={label} href="#" aria-label={label} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-400/20 hover:text-amber-400 border border-white/5 flex items-center justify-center transition-colors duration-200">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Navigasi</h4>
          <ul className="space-y-2.5">
            {["Home", "Organogram", "Events", "News", "Hubungi Kami"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-xs text-gray-500 hover:text-amber-400 transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Seksi Bidang</h4>
          <ul className="space-y-2.5">
            {["Prestasi Akademik", "Seni", "TIK", "Olahraga", "Kepribadian Unggul"].map((s) => (
              <li key={s}>
                <a href="#organogram" className="text-xs text-gray-500 hover:text-amber-400 transition-colors">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-sm mb-4">Kontak Sekolah</h4>
          <ul className="space-y-4">
            {[
              { icon: MapPin, text: "Jl. Insan Permata No. 1, Kota, Provinsi 12345" },
              { icon: Phone,  text: "+62 812-3456-7890" },
              { icon: Mail,   text: "osis@smpitinsanpermata.sch.id" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex gap-3">
                <Icon className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-gray-500 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-gray-600">
        <p>© 2025/2026 OSIS SMPIT Insan Permata. All rights reserved.</p>
        <p>Dibuat oleh Tim OSIS</p>
      </div>
    </div>
  </footer>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <DarkModeProvider>
      <div className="font-body antialiased transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <VisionMission />
          <Organogram />
          <Events />
          <News />
          <CTABanner />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}
