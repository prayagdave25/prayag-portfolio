# Google Analytics Setup Guide

## Overview
Your portfolio is now configured with Google Analytics 4 (GA4) to track:
- Page views and visitor stats
- Link clicks (GitHub, LinkedIn, Email, Twitter)
- Project interactions (VectorLoom GitHub/Demo links)
- User engagement metrics

## Setup Steps

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" (gear icon)
4. Create a new property:
   - Property name: "Prayag Portfolio"
   - Time zone: Your timezone
   - Currency: Your currency

### 2. Set Up Data Stream
1. After creating property, click "Data Streams"
2. Click "Add stream" → "Web"
3. Enter your website URL (e.g., `https://prayag-portfolio.vercel.app`)
4. Stream name: "Portfolio Website"
5. Click "Create stream"
6. **Copy the Measurement ID** (format: G-XXXXXXXXXX)

### 3. Add Measurement ID to Your Project

#### For Local Development:
1. Create a file named `.env.local` in your project root
2. Add this line:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   (Replace G-XXXXXXXXXX with your actual Measurement ID)

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXXXXXXXXX` (your Measurement ID)
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save"
5. Redeploy your site for changes to take effect

### 4. Verify Installation
1. Visit your deployed website
2. Go to Google Analytics → Reports → Realtime
3. You should see yourself as an active user
4. Click around your site and verify events are being tracked

## What's Being Tracked

### Automatic Tracking:
- **Page Views**: Every page visit
- **User Sessions**: How long users stay
- **Traffic Sources**: Where visitors come from
- **Device Types**: Desktop, mobile, tablet
- **Geographic Location**: Country, city
- **Browser & OS**: What technology visitors use

### Custom Event Tracking:
- **Contact Link Clicks**:
  - GitHub profile click
  - LinkedIn profile click
  - Email click
  - Twitter click

- **Project Interactions**:
  - VectorLoom GitHub repository click
  - VectorLoom Demo click (when available)

## Viewing Your Analytics

### Real-Time Reports:
- Go to Reports → Realtime
- See current active users
- View what pages they're on
- See events as they happen

### Traffic Reports:
- Reports → Acquisition → Traffic acquisition
- See where visitors come from (Google, LinkedIn, direct, etc.)

### Engagement Reports:
- Reports → Engagement → Events
- See all tracked events (clicks, page views)
- View event counts and user engagement

### User Reports:
- Reports → User → Demographics
- See visitor locations, devices, browsers

## Custom Dashboards

### Create a Custom Dashboard:
1. Go to "Explore" in left sidebar
2. Click "Blank" to create new exploration
3. Add metrics you care about:
   - Total users
   - Page views
   - Event counts (link clicks)
   - Average session duration
   - Bounce rate

### Recommended Metrics to Track:
- **Total Visitors**: How many people visit
- **GitHub Clicks**: Interest in your code
- **LinkedIn Clicks**: Professional networking interest
- **VectorLoom Clicks**: Interest in your AI project
- **Average Time on Site**: Engagement level
- **Top Pages**: Which sections get most attention

## Privacy Considerations

The current setup:
- ✅ Uses Google Analytics 4 (GDPR compliant)
- ✅ No personal data collection
- ✅ Anonymous visitor tracking
- ✅ Respects Do Not Track settings

For EU visitors, consider adding a cookie consent banner if needed.

## Troubleshooting

### Analytics Not Working?
1. Check if `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the Measurement ID format (G-XXXXXXXXXX)
3. Make sure you redeployed after adding the environment variable
4. Check browser console for errors
5. Disable ad blockers when testing

### Events Not Showing?
1. Wait 24-48 hours for full data processing
2. Use Realtime reports for immediate feedback
3. Check if events are firing in browser console (Network tab)

## Advanced Features (Optional)

### Set Up Goals:
1. Go to Admin → Events → Create event
2. Track specific actions like:
   - "Download Resume" (if you add this feature)
   - "Contact Form Submit"
   - Time spent on specific sections

### Link to Google Search Console:
1. Verify your site in Search Console
2. Link it to Analytics for SEO insights
3. See what search terms bring visitors

### Set Up Alerts:
1. Go to Admin → Custom alerts
2. Get notified when:
   - Traffic spikes
   - Specific events occur frequently
   - Unusual activity detected

## Next Steps

1. ✅ Set up Google Analytics account
2. ✅ Get your Measurement ID
3. ✅ Add to Vercel environment variables
4. ✅ Redeploy your site
5. ✅ Verify tracking is working
6. 📊 Check analytics daily for first week
7. 📈 Review weekly reports
8. 🎯 Optimize based on data

## Support

- [Google Analytics Help Center](https://support.google.com/analytics)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
