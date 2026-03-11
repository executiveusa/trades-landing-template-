# Hero Image Setup Instructions

Your Cuba hero image has been added to the project. The file `cuba-hero.heic` is located in `/public`.

## Image Format Issue

The current image is in **HEIC format**, which has limited browser support. For best compatibility, convert it to **JPG** format.

## Quick Conversion Options

### Option 1: Online Converter (Easiest - 2 minutes)
1. Visit: https://www.freeconvert.com/heic-to-jpg
2. Upload: `20260310_112956[1].heic`
3. Download the JPG
4. Save as: `public/cuba-hero.jpg`
5. Done! No installation needed.

### Option 2: Windows Photos App (Built-in)
1. Find the HEIC file on your computer
2. Right-click → Open with → Photos
3. Click Menu (⋯) → Export
4. Choose JPEG format
5. Save to: `public/cuba-hero.jpg`

### Option 3: Use Online Cloud Service
- **Cloudconvert**: https://cloudconvert.com/heic-to-jpg
- **Zamzar**: https://www.zamzar.com/convert/heic-to-jpg/
- **Convertio**: https://convertio.co/heic-jpg/

## Image Sizing

For full-page hero use:
- **Desktop**: 1920x1080 (9:5 aspect ratio)
- **Mobile**: 1080x1440 (3:4 aspect ratio, portrait)

Most online converters will let you resize during export.

## After Conversion

Once you have the JPG file:

1. Place it in: `public/cuba-hero.jpg`
2. The HeroEnhanced component will automatically use it
3. Run `npm run dev` to see the changes

## Current Hero Component

The hero is already configured to use `/cuba-hero.jpg` (or `.heic` for browsers that support it). Just add the converted JPG file and it will display immediately.

### Files to Update (if needed):
- `components/HeroEnhanced.tsx` - Already references `src="/cuba-hero.heic"`
- `public/cuba-hero.jpg` - Place your converted JPG here

---

**Questions?**
- The image should be at least 1920×1080 for best results
- Recommended file size: 150-300 KB after compression
- JPG quality setting: 85-90 (good balance of quality vs size)
