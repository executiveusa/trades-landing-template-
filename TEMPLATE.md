# TEMPLATE.md — How to Clone & Rebrand for Another Trade Worker

This template is designed to be **cloned and rebranded quickly** for any trades worker (plumber, electrician, painter, carpenter, etc.) in Mexico.

---

## Quick Rebrand Checklist (5 minutes)

### 1️⃣ Clone the Repo
```bash
git clone <this-repo-url> my-new-trades-site
cd my-new-trades-site
rm -rf .git  # (Optional) Start fresh history
git init
```

### 2️⃣ Edit `content/tenant.json`
This is the **only file** you need to edit for basic rebrand.

```json
{
  "businessName": "Plomería García",      // Your business
  "tradeName": "Tuberías y Desagües",     // Your trade
  "tagline": "Soluciones de plomería confiables",
  "phone": "+1-289-123-4567",
  "whatsappNumber": "525298765432",       // No + or spaces
  
  "hero": {
    "h1": "Plomería Profesional en Puerto Vallarta",
    "subhead": "Reparación, instalación y mantenimiento de sistemas de agua.",
    "cta1": "Obtener Cotización",
    "cta2": "Contactar por WhatsApp"
  },

  "services": [
    {
      "id": "reparacion",
      "name": "Reparación de Tuberías",
      "description": "Diagnóstico y reparación de fugas, entupimientos, y averías."
    },
    // ... more services
  ],

  "projects": [
    {
      "id": "residential-1",
      "title": "Casa en Marina Vallarta",
      "description": "Instalación completa de sistema de agua y drenaje.",
      "beforeImg": "/images/before-1.jpg",
      "afterImg": "/images/after-1.jpg"
    },
    // ... 2 more projects
  ],

  "testimonials": [
    {
      "id": "client-1",
      "name": "Cliente Name",
      "role": "Dueño, Ubicación",
      "text": "Excelente servicio...",
      "rating": 5
    },
    // ... 2 more testimonials
  ],

  "theme": {
    "accent": "#3b82f6",      // Change color (hex)
    "background": "#faf9f7",
    "text": "#1a1a1a",
    "textLight": "#666666",
    "border": "#e5e5e5"
  }
}
```

### 3️⃣ Add Images
```bash
# Replace placeholder images:
public/images/before-1.jpg  → Your before image 1
public/images/after-1.jpg   → Your after image 1
public/images/before-2.jpg
public/images/after-2.jpg
public/images/before-3.jpg
public/images/after-3.jpg

# Optional: Add more thumbnails (4 shown by default)
```

### 4️⃣ Test
```bash
npm install
npm run dev
# Open http://localhost:3000
# Check: hero CTAs, WhatsApp link, contact form, mobile view
```

### 5️⃣ Deploy
```bash
git add .
git commit -m "Setup for [Business Name]"
git push origin main
# Link to Vercel via Git integration
```

---

## Field-by-Field Guide

### `businessName` (required)
Your company name (appears in navbar, footer, meta tags).

**Example:**
- "Plomería García"
- "Electricidad Popular"
- "Pintura & Decoración"

### `tradeName` (required)
What you do (appears in hero, tagline).

**Example:**
- "Tuberías y Desagües"
- "Servicios Eléctricos"
- "Acabados Profesionales"

### `tagline`
One-liner about your business.

### `city` & `serviceAreas`
Replace Puerto Vallarta references with your city.

**Example:**
```json
{
  "city": "Guadalajara",
  "serviceAreas": [
    "Guadalajara Centro",
    "Zapopan",
    "Tlaquepaque",
    "Tonalá"
  ]
}
```

### `phone` & `whatsappNumber`
- `phone`: Display format (for `<a href="tel:...">`)
- `whatsappNumber`: Digits only, no + or spaces (e.g., "525298765432")

**Example for Guadalajara:**
```json
{
  "phone": "+1-33-1234-5678",
  "whatsappNumber": "523312345678"
}
```

### `hero`
Headline and subheading.

**Guidelines:**
- H1 should include **location + trade type**
- Keep subhead to 1–2 sentences
- Mention key benefits (fast, professional, experience, etc.)

**Example:**
```json
{
  "h1": "Electricidad Confiable en Guadalajara",
  "subhead": "Instalación, reparación y mantenimiento de sistemas eléctricos. Licenciados y asegurados.",
  "cta1": "Pedir Presupuesto",
  "cta2": "Llamar por WhatsApp"
}
```

### `services` (3–6 items)
List your main service offerings.

**Fields:**
- `id`: Unique identifier (kebab-case)
- `name`: Service name
- `description`: 1–2 sentence description

**Example:**
```json
{
  "id": "instalacion",
  "name": "Instalación Eléctrica",
  "description": "Proyectos nuevos, ampliaciones y modernización de sistemas."
}
```

### `projects` (3 items)
Before/After comparisons.

**Fields:**
- `id`: Unique identifier
- `title`: Project name/location
- `description`: What you did
- `beforeImg`: Path to before image
- `afterImg`: Path to after image

**Image requirements:**
- JPG or PNG
- No larger than 2MB each (optimize!)
- Landscape recommended (4:3 aspect ratio)
- Place in `public/images/`

### `testimonials` (3 items)
Client feedback (name, role, text, 5-star rating).

**Example:**
```json
{
  "id": "client-1",
  "name": "María López",
  "role": "Dueña, Casa en Zapopan",
  "text": "Trabajo rápido y limpio. Resolvió el problema a la primera.",
  "rating": 5
}
```

### `contactForm`
Form field labels and success messages.

**Default works for most trades.** Change only if needed:
```json
{
  "fields": [
    { "name": "nombre", "label": "Nombre", "required": true },
    // ...
  ],
  "messageSuccess": "¡Gracias! Te contactaremos pronto.",
  "messageError": "Hubo un error. Intenta nuevamente."
}
```

### `theme`
Colors (must be hex).

**Recommendation:** Pick 1 accent color that matches your brand.

| Trade | Accent | Hex |
|-------|--------|-----|
| Plumbing | Blue | #0ea5e9 |
| Electrical | Yellow | #eab308 |
| Carpentry | Orange | #f97316 |
| Painting | Purple/Teal | #8b5cf6 / #14b8a6 |

```json
{
  "accent": "#3b82f6"  // Change this to your color
}
```

---

## Files to Check/Edit (Beyond tenant.json)

### If You Need to Change Anything Else

| File | Purpose | When to Edit |
|------|---------|-----|
| `content/tenant.json` | ⭐ Business config | Always (rebrand data) |
| `public/images/*` | Project photos | If you have before/after images |
| `app/layout.tsx` | Title, description, schema | If you want to customize SEO |
| `tailwind.config.ts` | CSS customization | If you need custom fonts/spacing |
| `app/globals.css` | Global styles | If you want to adjust borders/radius |

**For 90% of Cases:** Only edit `content/tenant.json`.

---

## Multi-Tenant Setup (Advanced)

If you want to **run multiple businesses** from one codebase:

1. Create a folder structure:
   ```
   content/
   ├── plomeria.json
   ├── electricida.json
   └── pintura.json
   ```

2. Update `lib/tenant.ts` to accept a slug:
   ```typescript
   export function getTenant(slug = 'default'): Tenant {
     const tenants = {
       'plomeria': plomeria,
       'electricidad': electricidad,
       'pintura': pintura,
     }
     return tenants[slug] || tenants['default']
   }
   ```

3. Update `app/page.tsx` to read URL:
   ```typescript
   // Use useParams() or pass via env
   const tenant = getTenant(params.slug)
   ```

(Not included in v1, but structure allows it.)

---

## Common Mistakes

❌ **Mistake:** Forgetting to update All tenant.json fields
✓ **Fix:** Search for "Puerto Vallarta" and "Yeso" to find all references

❌ **Mistake:** Image paths are wrong
✓ **Fix:** Images must be in `public/images/` and referenced as `/images/filename.jpg`

❌ **Mistake:** WhatsApp number has + or spaces
✓ **Fix:** Use only digits: `525298765432` (not "+52 9 8765 4321")

❌ **Mistake:** Colors in tenant.json are not valid hex
✓ **Fix:** Use hex format: `#0ea5e9`, not `rgb(14, 165, 233)` or color names

---

## Deployment Steps

### Option 1: Vercel (Recommended)
1. Push to GitHub
2. Link repo: https://vercel.com/new
3. Deploy (automatic on push)

### Option 2: Netlify
1. Push to GitHub
2. Link repo: https://app.netlify.com/
3. Set build command: `npm run build`
4. Deploy

### Option 3: Self-hosted
```bash
npm run build
npm run start  # Runs on port 3000
# Use nginx/apache/PM2 as reverse proxy
```

---

## Performance Tips

1. **Optimize images** before uploading:
   ```bash
   # macOS/Linux
   sips -Z 800 image.jpg
   # Or use https://tinypng.com
   ```

2. **Use AVIF/WebP** formats (Next.js handles auto-conversion)

3. **Test mobile** (use Chrome DevTools)

---

## Support

- **For Next.js issues:** https://nextjs.org/docs
- **For Tailwind:** https://tailwindcss.com/docs
- **For WhatsApp deep links:** https://www.whatsapp.com/business/api/
- **For Vercel deployment:** https://vercel.com/docs

---

## License

Same as main template: MIT. Reuse freely.

---

**Happy rebranding! 🎨**
