# 🤖 Gemini API Setup Guide

## Quick Start

The chatbot is ready to use with a built-in API key! No setup required for testing.

## For Production Use

### 1. Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the generated key

### 2. Configure Environment

Create a `.env` file in your project root:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Security Best Practices

- **Never commit** your API key to version control
- **Use environment variables** for all API keys
- **Rotate keys regularly** for security
- **Monitor usage** in Google AI Studio dashboard

## Built-in API Key

The chatbot includes a built-in API key for immediate testing:
- **Key**: `AIzaSyAC9bD8FTjXMFY6agLTek4aKXCLB9dpOV8`
- **Usage**: Limited for testing purposes
- **Production**: Replace with your own key

## Rate Limits

- **Free Tier**: 15 requests per minute
- **Paid Tier**: Higher limits available
- **Fallback**: Mock responses if rate limit exceeded

## Error Handling

The chatbot includes comprehensive error handling:
- **Network errors**: Automatic retry with fallback
- **Rate limits**: Graceful degradation to mock responses
- **API errors**: User-friendly error messages
- **Toast notifications**: Visual feedback for errors

## Testing

1. **With Built-in Key**: Works immediately
2. **With Your Key**: Add to `.env` file
3. **Mock Mode**: Automatic fallback if API fails

## Support

- **Documentation**: [Gemini API Docs](https://ai.google.dev/docs)
- **Issues**: Check console for error details
- **Fallback**: Mock responses ensure always-available support
