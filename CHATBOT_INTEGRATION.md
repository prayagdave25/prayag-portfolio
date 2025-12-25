# Resume Chatbot Integration Guide

## ✅ Integration Complete!

The resume chatbot widget has been successfully integrated into your portfolio. Here's what was done and what you need to do next.

## What Was Done

1. ✅ Copied `widget.js` and `widget.css` to the `public/` folder
2. ✅ Updated `app/layout.tsx` to include the chatbot widget
3. ✅ Added environment variable placeholders to `.env.local.example`
4. ✅ Configured the widget with your branding and suggested questions

## What You Need to Do

### Step 1: Set Up VectorLoom Backend

You need a VectorLoom backend deployed. Based on the documentation in `resume-chatbot-widget/`, you have two options:

**Option A: Quick Setup (Recommended)**
- Follow `resume-chatbot-widget/QUICKSTART_RAILWAY_VERCEL.md` for step-by-step Railway deployment

**Option B: Detailed Setup**
- Follow `resume-chatbot-widget/SETUP_GUIDE.md` for comprehensive instructions

### Step 2: Create `.env.local` File

Create a `.env.local` file in your project root with these values:

```bash
# Google Analytics (if you have it)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# VectorLoom Backend URL (from Railway/Render)
NEXT_PUBLIC_VECTORLOOM_BACKEND_URL=https://your-app.up.railway.app

# Qdrant Configuration (from your Qdrant Cloud account)
NEXT_PUBLIC_QDRANT_URL=https://your-cluster.qdrant.io
NEXT_PUBLIC_QDRANT_API_KEY=your-qdrant-api-key
```

**Where to get these values:**
- `NEXT_PUBLIC_VECTORLOOM_BACKEND_URL`: Your Railway/Render deployment URL
- `NEXT_PUBLIC_QDRANT_URL`: From Qdrant Cloud dashboard
- `NEXT_PUBLIC_QDRANT_API_KEY`: From Qdrant Cloud dashboard

### Step 3: Upload Your Resume

Once your backend is deployed:

1. Use the VectorLoom UI or the `upload_resume.py` script
2. Upload your resume PDF
3. The system will process and embed it into the vector database

### Step 4: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and:
- Look for the 💬 button in the bottom-right corner
- Click it to open the chat widget
- Try asking questions about your resume

### Step 5: Deploy to Vercel

1. Add environment variables in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all three `NEXT_PUBLIC_*` variables

2. Deploy:
```bash
git add .
git commit -m "Add resume chatbot integration"
git push origin main
```

Vercel will auto-deploy!

## Customization

### Change Colors

Edit `app/layout.tsx` and modify the `theme.primaryColor`:

```javascript
theme: {
  primaryColor: '#YOUR_COLOR',  // Change this
  // ...
}
```

### Change Suggested Questions

Edit the `suggestedQuestions` array in `app/layout.tsx`:

```javascript
suggestedQuestions: [
  'Your custom question 1',
  'Your custom question 2',
  // Add more...
]
```

### Change Welcome Message

Edit `welcomeMessage` in `app/layout.tsx`:

```javascript
theme: {
  welcomeMessage: 'Your custom welcome message!',
  // ...
}
```

## Security Best Practice (Optional)

For production, consider creating an API proxy to hide your credentials:

1. Create `app/api/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(
      `${process.env.VECTORLOOM_BACKEND_URL}/api/query`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          credentials: {
            db_type: 'qdrant',
            url: process.env.QDRANT_URL,
            api_key: process.env.QDRANT_API_KEY
          }
        })
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to query' },
      { status: 500 }
    );
  }
}
```

2. Update `.env.local` (remove `NEXT_PUBLIC_` prefix):
```bash
VECTORLOOM_BACKEND_URL=https://your-app.up.railway.app
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=your-qdrant-api-key
```

3. Update `app/layout.tsx`:
```javascript
backendUrl: '/api/chat',  // Changed
credentials: {},          // Empty
```

## Troubleshooting

### Widget Not Appearing
- Check browser console for errors (F12)
- Verify `widget.js` and `widget.css` are in `public/` folder
- Ensure `.env.local` exists with correct values

### Connection Errors
- Verify backend URL is correct and accessible
- Check CORS settings in your VectorLoom backend
- Test backend health: `https://your-backend-url/api/health`

### No Responses
- Ensure you've uploaded your resume to VectorLoom
- Check backend logs for errors
- Verify Qdrant credentials are correct

## Resources

- `resume-chatbot-widget/README.md` - Full widget documentation
- `resume-chatbot-widget/QUICKSTART_RAILWAY_VERCEL.md` - Quick deployment guide
- `resume-chatbot-widget/ARCHITECTURE.md` - System architecture details
- `resume-chatbot-widget/COPY_PASTE_CODE.md` - Code snippets reference

## Support

If you encounter issues:
1. Check the documentation in `resume-chatbot-widget/` folder
2. Review browser console and backend logs
3. Verify all environment variables are set correctly

---

**Next Steps:**
1. Deploy VectorLoom backend (Railway/Render)
2. Create `.env.local` with your credentials
3. Upload your resume
4. Test locally
5. Deploy to Vercel

Good luck! 🚀
