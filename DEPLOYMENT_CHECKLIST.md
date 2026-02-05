# Deployment Checklist

## Pre-Deployment

### 1. Replace Placeholder Content

- [ ] **Contact Email**: Update `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` or Vercel environment variables
- [ ] **Site URL**: Update `NEXT_PUBLIC_SITE_URL` to your actual domain
- [ ] **Calendly URL** (optional): Add your Calendly embed URL to `NEXT_PUBLIC_CALENDLY_URL`
- [ ] **Phone Number** (optional): Add phone number to `NEXT_PUBLIC_PHONE` if desired
- [ ] **Favicon**: Replace `/public/favicon.svg` with your brand favicon (or create `/public/favicon.ico`)
- [ ] **OG Image** (optional): Create `/public/og-image.png` (1200x630px) for social sharing

### 2. Review Copy

- [ ] Review all copy in components (Hero, Solutions, Offer, Process, Proof, FAQ)
- [ ] Update pricing if needed (`components/Offer.tsx`)
- [ ] Update case study examples if you have real ones (`components/Proof.tsx`)
- [ ] Review FAQ answers for accuracy

### 3. Test Locally

- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test all navigation links
- [ ] Test contact form submission
- [ ] Test mobile responsiveness
- [ ] Check all CTAs work correctly
- [ ] Verify smooth scrolling

### 4. SEO & Metadata

- [ ] Update metadata in `app/layout.tsx` (title, description, keywords)
- [ ] Verify OpenGraph tags are correct
- [ ] Verify Twitter card metadata
- [ ] Check schema.org JSON-LD in `app/layout.tsx`

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Kanam Technologies website"
git remote add origin https://github.com/yourusername/kanam-tech.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

In Vercel project settings → Environment Variables, add:

- `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- `NEXT_PUBLIC_CONTACT_EMAIL` = `your-email@kanamtech.com`
- `NEXT_PUBLIC_CALENDLY_URL` = `https://calendly.com/your-username` (optional)
- `NEXT_PUBLIC_PHONE` = `+1-555-123-4567` (optional)

**Important**: Add these for all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain (e.g., `kanamtech.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to match your custom domain

## Post-Deployment

### 1. Verify Site

- [ ] Visit your live site
- [ ] Test all navigation links
- [ ] Submit a test contact form
- [ ] Check mobile view
- [ ] Verify all CTAs work
- [ ] Check page load speed

### 2. Set Up Contact Form Email

The contact form currently logs to console. To send emails:

**Option A: Use Resend** (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Install: `npm install resend`
4. Update `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In POST handler, after validation:
await resend.emails.send({
  from: 'contact@kanamtech.com',
  to: process.env.CONTACT_EMAIL,
  subject: `New Contact: ${name} from ${organization}`,
  html: `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Organization:</strong> ${organization}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

5. Add `RESEND_API_KEY` to Vercel environment variables

**Option B: Use SendGrid**

Similar process with SendGrid API

**Option C: Webhook to CRM**

POST to your CRM/webhook endpoint instead

### 3. Analytics (Optional)

- [ ] Add Google Analytics or Plausible
- [ ] Add tracking script to `app/layout.tsx`

### 4. Monitoring

- [ ] Set up Vercel monitoring/alerts
- [ ] Monitor contact form submissions
- [ ] Check error logs in Vercel dashboard

## Ongoing Maintenance

- Review and update copy quarterly
- Update case studies as you complete projects
- Monitor form submissions and response times
- Keep dependencies updated (`npm audit`, `npm update`)

