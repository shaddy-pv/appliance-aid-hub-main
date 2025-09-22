# 🔒 Security Setup Guide

## API Key Security

Your project has been configured to use environment variables for API keys instead of hardcoded values. This ensures your sensitive credentials are never committed to version control.

## Setup Instructions

### 1. Create Environment File

Create a `.env` file in your project root:

```bash
cp .env.example .env
```

### 2. Add Your API Key

Edit the `.env` file and add your actual Gemini API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the generated key to your `.env` file

## Security Features

✅ **Environment Variables**: All API keys stored in `.env` files  
✅ **Git Ignore**: `.env` files are excluded from version control  
✅ **No Hardcoded Keys**: Removed all hardcoded API keys from code  
✅ **Template File**: `.env.example` provides setup guidance  
✅ **Error Handling**: Clear error messages when API key is missing  

## Files Modified

- `src/lib/gemini-api.ts` - Removed hardcoded API key
- `.gitignore` - Added `.env` file exclusions
- `.env.example` - Created template file
- Documentation files - Removed exposed API keys

## Before Uploading to GitHub

1. ✅ Ensure `.env` file exists and contains your API key
2. ✅ Verify `.env` is in `.gitignore` (it should be)
3. ✅ Test your application works with the environment variable
4. ✅ Never commit `.env` files to version control

## Production Deployment

For production deployment, set environment variables in your hosting platform:

- **Vercel**: Add in Project Settings > Environment Variables
- **Netlify**: Add in Site Settings > Environment Variables  
- **Railway**: Add in Project Settings > Variables
- **Heroku**: Use `heroku config:set VITE_GEMINI_API_KEY=your_key`

## Troubleshooting

If you see "API Key Required" error:
1. Check that `.env` file exists in project root
2. Verify `VITE_GEMINI_API_KEY` is set correctly
3. Restart your development server after adding the key
4. Ensure no typos in the environment variable name
