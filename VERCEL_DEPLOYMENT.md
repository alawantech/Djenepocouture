# Vercel Deployment Guide

## Issues Fixed

### 1. Image Path Issues
- **Problem**: Using `/src/` paths that don't work in production
- **Solution**: Changed to proper ES6 imports for all images

### 2. Firebase Configuration
- **Problem**: Environment variables not properly configured
- **Solution**: Added better error handling and validation

## Deployment Steps

### 1. Build the Project Locally (Test)
```bash
npm run build
npm run preview
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Using Git Integration
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will auto-deploy

### 3. Configure Environment Variables in Vercel

In your Vercel dashboard, go to your project → Settings → Environment Variables and add:

```
VITE_FIREBASE_API_KEY=AIzaSyDBjeWgtBje_YJaDHI3QNbzqf4fBn2RqiE
VITE_FIREBASE_AUTH_DOMAIN=djenepocouture.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=djenepocouture
VITE_FIREBASE_STORAGE_BUCKET=djenepocouture.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=883375383807
VITE_FIREBASE_APP_ID=1:883375383807:web:3fe8b121a87eae2f5d18ca
VITE_FIREBASE_MEASUREMENT_ID=G-R4XGH5VGT7
```

**Important**: Make sure to set these for all environments (Development, Preview, Production)

### 4. Redeploy
After adding environment variables, trigger a new deployment.

## Debugging

### Check Browser Console
Open Developer Tools → Console to see any errors:
- Firebase connection issues
- Missing environment variables
- Network errors

### Logs to Watch For
- "Firebase initialized successfully"
- "Attempting to fetch products from Firestore..."
- "Successfully fetched products: X"

### Common Issues
1. **Environment variables not set**: You'll see console errors about missing Firebase vars
2. **Firebase rules**: Make sure Firestore rules allow reading
3. **Network issues**: Check if Firebase project is accessible

## Testing
1. Test locally with `npm run build && npm run preview`
2. Check browser console for errors
3. Verify products load on both Home and Products pages
4. Verify hero images slide correctly
