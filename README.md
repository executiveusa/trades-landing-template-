# PV Plaster Landing Template

Premium, minimal landing page for trades workers in Puerto Vallarta. Built with Next.js, Tailwind CSS, and Motion Primitives.

**Features:**
- 📱 Fully responsive (mobile-first)
- ⚡ Fast (Vercel Edge, optimized images)
- 🎨 Customizable theme (CSS variables, TweakCN-compatible)
- 📍 Multi-location service area
- 💬 WhatsApp integration (deep links, pre-filled messages)
- ✉️ Contact form (static server action)
- 🖼️ Before/After image sliders (motion-enabled)
- 🎪 Testimonials, services, projects sections
- ♿ Accessible (WCAG 2.1 AA)
- 🔍 SEO-ready (metadata, JSON-LD)

---

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Install & Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build & Deploy

### Lint & Build
```bash
npm run lint
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Link repo to [Vercel](https://vercel.com)
3. Deploy (automatic on push)

No environment variables needed for v1.

---

## Customization (5-Minute Rebrand)

All business info is centralized in **`content/tenant.json`**.

### Step 1: Edit Tenant Config
```bash
# Open and edit:
nano content/tenant.json
```

Update these fields:
- `businessName` → Your business name
- `tradeName` → Your trade (e.g., "Plomería", "Electricidad")
- `whatsappNumber` → Your WhatsApp number (international format, no +)
- `hero.h1` → Main headline
- `services[]` → Your services (add/remove/edit)
- `projects[]` → Your before/after projects
- `testimonials[]` → Client quotes
- `theme.accent` → Primary color (hex)

### Step 2: Update Images
```bash
# Replace placeholders in public/images/:
public/images/before-1.jpg  → Your before image 1
public/images/after-1.jpg   → Your after image 1
# ... repeat for projects 2 & 3
```

### Step 3: Verify & Deploy
```bash
npm run lint
npm run build
npm run dev  # Test locally
git add .
git commit -m "Rebrand for [Business Name]"
git push
```

Vercel will auto-deploy.

---

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with theme vars
│   ├── page.tsx            # Home page (assembles sections)
│   └── globals.css         # Global styles + theme tokens
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Projects.tsx        # Before/After sliders
│   ├── Testimonials.tsx
│   ├── ServiceArea.tsx
│   ├── Contact.tsx         # Form with success state
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx  # Sticky CTA
├── lib/
│   ├── tenant.ts           # Tenant config loader
│   └── whatsapp.ts         # WhatsApp deep link builder
├── content/
│   └── tenant.json         # ⭐ All business data (EDIT THIS)
├── public/
│   └── images/             # Place before/after images here
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Features & Sections

### Navbar
- Sticky on scroll
- Anchors to sections (Servicios, Proyectos, Contacto)
- Mobile-friendly (hidden on small screens, full on desktop)

### Hero
- Full-height section with headline, subhead, 2 CTAs
- WhatsApp link + contact form link
- Trust line (quick social proof)

### Services
- 3–6 service cards (editable in `tenant.json`)
- Hover effects
- CTA button below

### Projects
- 3 **before/after sliders** (drag to compare)
- Project description + secondary CTA
- Additional thumbnail grid below

### Testimonials
- 3 client testimonials (star ratings)
- Trust metrics (# projects, years, satisfaction, response time)

### Service Area
- List of served cities/zones
- Link to contact for inquiries

### Contact Form
- 5 fields: Name, Email, Phone, Zone, Message
- Success state (auto-clears after 5s)
- Error handling

### WhatsApp Button
- Sticky button (bottom-right)
- Appears after scrolling 300px
- Pre-filled message with service type

### Footer
- Company name, trade, location
- Quick links (internal anchors)
- Contact info
- Copyright

---

## Theme Customization

### Colors (CSS Variables)
Edit in **`app/layout.tsx`** or `content/tenant.json`:

```json
{
  "theme": {
    "accent": "#0ea5e9",     // Primary (CTAs, links)
    "background": "#faf9f7", // Page bg (warm off-white)
    "text": "#1a1a1a",        // Main text (near-black)
    "textLight": "#666666",   // Secondary text
    "border": "#e5e5e5"       // Borders
  }
}
```

Theme is injected into `<style>` in the root layout and used by Tailwind as CSS variables (`var(--brand-accent)`, etc.).

### Tailwind Customization
Edit `tailwind.config.ts`:
- Border radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- Spacing, fonts, etc.

---

## Performance

- **Image optimization**: Next.js Image component with AVIF/WebP
- **Code splitting**: Per-route bundles
- **CSS**: Tailwind + PurgeCSS (production)
- **No heavy dependencies**: ~50KB gzipped initial JS
- **LCP**: Hero section loads fast
- **CLS**: Layout shifts minimized

---

## Accessibility (A11y)

- ✓ Semantic HTML
- ✓ ARIA labels where needed
- ✓ Focus states (visible :focus-visible outlines)
- ✓ Keyboard navigation
- ✓ Color contrast (AA compliant)
- ✓ Respects `prefers-reduced-motion`

---

## SEO

- **Title & description** per page
- **OG tags** for social sharing
- **JSON-LD LocalBusiness** schema
- **Canonical URLs** (Vercel auto-adds)
- **Mobile-friendly** (responsive, touch-friendly)
- **Fast Core Web Vitals** (image optimization, no CLS)

---

## Troubleshooting

### Build fails
```bash
npm run lint      # Check for errors
npm run build     # Full rebuild
```

### Images not showing
```bash
# Make sure images are in public/images/:
public/images/before-1.jpg
public/images/after-1.jpg
# Update tenant.json with correct paths
```

### WhatsApp link not working
```bash
# Check tenant.json:
"whatsappNumber": "525212345678"  # Must be valid, no +
```

### Form not submitting
- Check browser console for errors
- Form action currently logs to console; add API route if needed

---

## Environment Variables (Optional)

None required for v1. If you add backend features later:

```bash
# .env.local (optional)
NEXT_PUBLIC_SITE_URL=https://example.com
```

---

## Support & Feedback

For issues or questions:
1. Check TEMPLATE.md (below) for multi-tenant setup
2. Review `content/tenant.json` structure
3. Inspect dev console for runtime errors

---

## License

MIT. Use freely.

---

## Next Steps

### v2 Ideas (Not in v1)
- [ ] Admin dashboard for form submissions
- [ ] Email notifications on contact form
- [ ] Image upload for projects
- [ ] Multi-language support
- [ ] Dark theme option
- [ ] Analytics integration
- [ ] AI chat support

---

See **TEMPLATE.md** for duplicating this template for other businesses.
