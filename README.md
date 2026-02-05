# Kanam Technologies - Marketing Website

A production-ready, high-conversion, one-page marketing website built with Next.js, TypeScript, and Tailwind CSS.

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required
NEXT_PUBLIC_CONTACT_EMAIL=your-email@kanamtech.com
NEXT_PUBLIC_SITE_URL=https://kanamtech.com

# Optional
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
NEXT_PUBLIC_PHONE=+1-555-123-4567
```

## Deployment to Vercel

1. **Push to GitHub**: Commit and push your code to a GitHub repository.

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from `.env.local`:
     - `NEXT_PUBLIC_CONTACT_EMAIL`
     - `NEXT_PUBLIC_SITE_URL`
     - `NEXT_PUBLIC_CALENDLY_URL` (optional)
     - `NEXT_PUBLIC_PHONE` (optional)

4. **Deploy**: Vercel will automatically deploy. Your site will be live at `your-project.vercel.app`

5. **Custom Domain** (optional):
   - In Vercel project settings, go to "Domains"
   - Add your custom domain (e.g., `kanamtech.com`)
   - Follow DNS configuration instructions

## What to Replace

### 1. Contact Email
- **File**: `.env.local` or Vercel environment variables
- **Variable**: `NEXT_PUBLIC_CONTACT_EMAIL`
- **Default**: Currently set to `hello@kanamtech.com` in `components/Contact.tsx`

### 2. Calendly URL
- **File**: `.env.local` or Vercel environment variables
- **Variable**: `NEXT_PUBLIC_CALENDLY_URL`
- **Location**: `components/Contact.tsx` - Replace the placeholder with your Calendly embed URL
- **Format**: `https://calendly.com/your-username`

### 3. Site URL
- **File**: `.env.local` or Vercel environment variables
- **Variable**: `NEXT_PUBLIC_SITE_URL`
- **Used for**: SEO metadata, sitemap, robots.txt, schema.org markup

### 4. Phone Number (Optional)
- **File**: `.env.local` or Vercel environment variables
- **Variable**: `NEXT_PUBLIC_PHONE`
- **Location**: `components/Contact.tsx` - Only shows if variable is set

### 5. Favicon
- **File**: `public/favicon.ico`
- **Action**: Replace with your actual favicon file

### 6. OG Image (Optional)
- **File**: `public/og-image.png`
- **Action**: Create a 1200x630px image for social sharing
- **Location**: Update `app/layout.tsx` metadata if you add this file

## How to Change Copy

### Headlines and Main Text

1. **Hero Section**: `components/Hero.tsx`
   - Main headline (line ~15)
   - Subheadline (line ~18)
   - Trust chips (lines 6-10)

2. **Solutions Section**: `components/Solutions.tsx`
   - Section title (line ~30)
   - Solutions array (lines 8-40) - Edit titles, descriptions, and examples

3. **Offer Section**: `components/Offer.tsx`
   - Section title (line ~30)
   - Included items (lines 6-11)
   - Outcomes (lines 13-18)
   - Pricing (lines 50-60)

4. **Process Section**: `components/Process.tsx`
   - Steps array (lines 8-30) - Edit titles and descriptions

5. **Proof Section**: `components/Proof.tsx`
   - Examples array (lines 6-40) - Edit case study scenarios
   - Founder note (line ~70)

6. **FAQ Section**: `components/FAQ.tsx`
   - FAQs array (lines 8-40) - Edit questions and answers

7. **Contact Section**: `components/Contact.tsx`
   - Section title and microcopy (lines ~30-35)

### Metadata and SEO

- **File**: `app/layout.tsx`
- **Lines**: 4-30
- Edit: title, description, keywords, OpenGraph, Twitter card

### Footer

- **File**: `components/Footer.tsx`
- Edit: Company description, links, disclaimer text

## Contact Form

The contact form currently logs submissions to the server console. To send emails in production:

1. **Option 1: Use Resend** (Recommended)
   ```bash
   npm install resend
   ```
   Update `app/api/contact/route.ts` to send emails via Resend API.

2. **Option 2: Use SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```
   Update `app/api/contact/route.ts` to send emails via SendGrid.

3. **Option 3: Webhook**
   Update `app/api/contact/route.ts` to POST to your CRM/webhook endpoint.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main page (single page app)
│   ├── globals.css               # Global styles
│   ├── robots.ts                 # Robots.txt
│   └── sitemap.ts                # Sitemap.xml
├── components/
│   ├── Header.tsx                # Sticky navigation
│   ├── Hero.tsx                  # Hero section
│   ├── Solutions.tsx             # Solutions cards
│   ├── Offer.tsx                 # Automation Sprint offer
│   ├── Process.tsx               # 4-step process
│   ├── Proof.tsx                 # Case examples
│   ├── FAQ.tsx                   # FAQ accordion
│   ├── Contact.tsx               # Contact form & scheduling
│   └── Footer.tsx                # Footer
├── lib/
│   └── validation.ts             # Zod form validation
├── public/
│   └── favicon.ico               # Favicon
└── README.md                     # This file
```

## Features

- ✅ Next.js 14 App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS
- ✅ Framer Motion for subtle animations
- ✅ Lucide React icons
- ✅ Accessible markup (ARIA labels, keyboard navigation)
- ✅ SEO optimized (metadata, OpenGraph, Twitter card, sitemap, robots.txt)
- ✅ Schema.org JSON-LD
- ✅ Form validation with Zod
- ✅ Spam prevention (honeypot, rate limiting)
- ✅ Responsive design (mobile-first)
- ✅ Smooth scrolling navigation

## Performance

- Uses `next/image` for optimized images (when added)
- Lightweight animations (Framer Motion)
- No heavy background videos
- Optimized bundle size

## License

Private - Kanam Technologies

