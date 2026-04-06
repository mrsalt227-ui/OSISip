# 🌟 Website OSIS SMPIT Insan Permata

Website resmi Organisasi Siswa Intra Sekolah SMPIT Insan Permata.

## ✨ Tech Stack

- **React 18** + **Vite 5** — Fast build tooling
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion 11** — Smooth animations
- **Lucide React** — Crisp icon set
- **Plus Jakarta Sans** — Modern, clean typography

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The app will be live at **http://localhost:5173**

---

## 📁 Project Structure

```
smpit-osis/
├── src/
│   ├── App.jsx          # Main component (all sections)
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind + custom styles
├── index.html           # HTML shell
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## 🎨 Design System

| Token       | Value     | Usage                         |
|-------------|-----------|-------------------------------|
| Primary     | `#14532d` | Deep Green — trust & islamic  |
| Accent      | `#F59E0B` | Amber — energy & warmth       |
| Background  | `#ffffff` | White — clean & spacious      |
| Surface     | `#fafaf9` | Stone 50 — subtle warmth      |

## 📦 Sections

| Section      | ID            | Description                              |
|--------------|---------------|------------------------------------------|
| Navbar       | —             | Sticky glassmorphism, mobile responsive  |
| Hero         | `#home`       | Tagline, CTA, parallax, floating cards   |
| Vision/Mission| `#about`    | Vision card, numbered missions, values   |
| Organogram   | `#organogram` | Hierarchical leadership cards            |
| Events       | `#events`     | Program kerja grid with status badges    |
| News         | `#news`       | Article cards with category tags         |
| CTA Banner   | —             | Invitation section                       |
| Footer       | `#contact`    | Contact info, social links               |

## 🖼️ Adding Real Images

Replace the green placeholder div in `Hero` with an actual `<img>` tag:

```jsx
<img
  src="/images/hero-students.jpg"
  alt="Kegiatan Siswa SMPIT Insan Permata"
  className="w-full h-full object-cover"
/>
```

Place your images in the `/public/images/` folder.

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` — Single column, compact spacing
- **Tablet**: `640px–1024px` — 2-column grids
- **Desktop**: `> 1024px` — Full multi-column layouts
