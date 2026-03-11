# Vercel Deployment Instructions

## Quick Deploy (Recommended - 2 minutes)

Your project is ready to deploy to Vercel automatically from GitHub.

### Step 1: Connect to Vercel
1. Visit: https://vercel.com/new
2. Click "Import Project"
3. Select "GitHub" as source
4. Authorize Vercel with GitHub
5. Search for and select: **trades-landing-template-**

### Step 2: Configure (if needed)
- Framework: **Next.js** (auto-detected)
- Node.js Version: **18.x** (pre-configured in vercel.json)
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)

### Step 3: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Get your live URL

## Environment Variables (if needed)

Add to Vercel project settings:
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (from vercel.json)
- Any other required vars

## After Deployment

✅ Site lives at: `https://trades-landing-template.vercel.app` (or custom domain)
✅ Auto-redeploys on git push
✅ Preview deployments for PRs

## Troubleshooting

**Build fails?**
- Check `/logs` in Vercel dashboard
- Ensure all dependencies are in package.json
- No Windows-specific issues (Vercel uses Linux)

**Image not showing?**
- Verify `/public/cuba-hero.jpg` is in git
- Check file size (currently 1.5 MB - may need optimization)

**Slow site?**
- Image optimization in progress during first build
- Next.js Image component handles responsive sizing

---

## Current Project Status
✅ Code: All commits pushed to GitHub
✅ Repo: https://github.com/executiveusa/trades-landing-template-
✅ Latest: Commit 8064647 (Cuba hero image integrated)
✅ Config: vercel.json, next.config.ts, tailwind.config.ts ready
✅ Components: 5 enhanced components with Framer Motion
✅ Hero: Full-page background with Cuba image

**Ready to deploy!**
