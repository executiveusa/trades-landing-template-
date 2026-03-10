# Puerto Vallarta Plaster Landing Page

A modern, bilingual landing page for Ray's professional plaster and finishing services in Puerto Vallarta, Mexico.

## Features

- ✅ **Bilingual Support** (Spanish/English) with automatic language detection and localStorage persistence
- ✅ **Mobile-Responsive Design** with Tailwind CSS and Framer Motion animations
- ✅ **SEO-Optimized** with dynamic metadata, Open Graph, and schema.org markup
- ✅ **Conversion Tracking** with Google Analytics integration (GTM ready)
- ✅ **Blog System** with dynamic content management via JSON
- ✅ **WhatsApp Integration** with pre-formatted quote requests
- ✅ **Service Area Coverage** map with quick access to multiple locations
- ✅ **Performance Optimized** with Next.js 15 App Router and static generation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Deployment**: Vercel
- **Analytics**: Google Analytics (GTM)
- **CMS**: JSON-based content (`tenant.json`, `blog.json`)

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the site.

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/executiveusa/trades-landing-template-.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import the GitHub repository
   - Click "Deploy"
   - Vercel will automatically:
     - Install dependencies
     - Run build
     - Deploy to production at a .vercel.app domain
     - Set up GitHub integration for automatic deployments on push

3. **Configure Custom Domain** (in Vercel Dashboard):
   - Go to Settings → Domains
   - Add your custom domain (e.g., `rayplasterpr.com`)
   - Follow DNS setup instructions

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

### Option 3: Direct Upload

```bash
# Build the project
npm run build

# Deploy using Vercel CLI
vercel --prebuilt
```

## Configuration

### Update Business Information

Edit `content/tenant.json` to customize:

```json
{
  "businessName": "Your Business Name",
  "businessName_en": "Your Business Name (English)",
  "phone": "+1-555-123-4567",
  "facebookUrl": "https://www.facebook.com/YourPage",
  "whatsappNumber": "525512345678",
  "hero": {
    "h1": "Your Spanish Headline",
    "h1_en": "Your English Headline",
    "subhead": "Spanish description...",
    "subhead_en": "English description..."
  }
  // ... more config
}
```

### Blog Content

Add/edit blog posts in `content/blog.json`:

```json
[
  {
    "id": "post-slug",
    "titulo": "Spanish Title",
    "titulo_en": "English Title",
    "resumen": "Spanish summary...",
    "resumen_en": "English summary...",
    "contenido": "Spanish content...",
    "contenido_en": "English content...",
    "imagen": "https://example.com/image.jpg"
  }
]
```

### Google Analytics Setup

Update the Google Analytics ID in `app/layout.tsx`:

1. Replace `G-XXXXXXXXXX` with your actual GA Measurement ID (appears in 2 places)
2. Get your ID from Google Analytics Dashboard → Admin → Data Collections → Web
3. Rebuild and redeploy

### Contact Form Integration (Optional)

The contact form currently logs submissions to browser console. To send emails:

**Option A: Use Resend (Recommended for serverless)**
```bash
npm install resend
```

Update `app/api/contact/route.ts` (create if doesn't exist):
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  
  const result = await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: process.env.CONTACT_EMAIL,
    subject: `New Quote Request from ${body.nombre}`,
    html: `<p>Name: ${body.nombre}</p><p>Email: ${body.email}</p>...`
  });

  return Response.json(result);
}
```

**Option B: Use Webhook (e.g., Make, Zapier)**
Configure in Contact.tsx to post to your webhook endpoint.

## Monitoring & Maintenance

### Track Performance

- **Google Analytics**: Monitor traffic, user behavior, and conversion events
- **Vercel Analytics**: Built-in with Vercel deployment
- **Lighthouse**: Run audits in Chrome DevTools

### Update Analytics ID

After setting up Google Analytics:
1. Find your Measurement ID (format: `G-XXXXX`)
2. Update both instances in `app/layout.tsx`
3. Commit and push to trigger redeployment

### Contact Form Events

The form automatically tracks:
- Form submissions (event: `contact_form_submit`)
- Language used for submission
- Service area selected
- Timestamp

View in Google Analytics → Events.

## CI/CD Pipeline

Every push to `main` branch automatically:
1. Installs dependencies
2. Runs linting
3. Builds optimized production bundle
4. Deploys to Vercel preview URL (for PR) or production (for main)

## File Structure

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout with analytics
│   ├── page.tsx              # Home page
│   ├── blog/                 # Blog pages
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ClientLangProvider    # Language switching context
│   ├── Contact.tsx           # Contact form with analytics
│   ├── Hero.tsx              # Hero section
│   ├── Services.tsx          # Services showcase
│   └── ...
├── content/
│   ├── tenant.json           # Business config & copywriting
│   └── blog.json             # Blog posts
├── lib/
│   ├── tenant.ts             # Tenant config loader
│   └── lang.tsx              # Language context provider
├── scripts/                  # Utility scripts (development only)
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── vercel.json               # Vercel configuration
```

## Environment Variables

No sensitive env vars required for basic deployment. Optional:

```
NEXT_PUBLIC_GA_ID=G-XXXXX          # Google Analytics ID (public)
RESEND_API_KEY=re_xxxxx            # If using Resend for emails
CONTACT_EMAIL=your@email.com       # Where to send contact forms
```

## Troubleshooting

**Build fails locally:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Blank pages or 404s:**
- Check `content/tenant.json` is valid JSON
- Verify all required fields are present
- Check Vercel deployment logs

**Analytics not tracking:**
- Verify GA ID is correct in `app/layout.tsx`
- Check browser console for errors
- Ensure GA script isn't blocked by ad blocker

## Support & Next Steps

1. **Deploy first**: Get the site live on your domain ASAP
2. **Monitor analytics**: Track which copy/services resonate
3. **Iterate based on data**: Adjust headlines and messaging based on real user behavior
4. **Add email integration**: Set up Resend or similar for automatic quote requests
5. **Mobile optimization**: Test on actual devices, optimize for local mobile traffic

---

Built with ❤️ for Ray's professional plaster services.
