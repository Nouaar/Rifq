# AI Backend Implementation

## Overview
This document describes the backend implementation for the Gemini AI service that provides tips, recommendations, and reminders for pets based on their medical history.

## Implementation Details

### Backend Structure

#### 1. AI Module (`src/modules/ai/`)
- **ai.controller.ts**: REST API endpoints for AI services
- **ai.service.ts**: Business logic for generating AI content
- **gemini.service.ts**: Service for calling Google Gemini API
- **ai.module.ts**: NestJS module configuration

#### 2. API Endpoints

All endpoints require JWT authentication via Bearer token.

- `GET /ai/pets/:petId/tips` - Get AI-generated tips for a pet
- `GET /ai/pets/:petId/recommendations` - Get AI-generated recommendations
- `GET /ai/pets/:petId/reminders` - Get AI-generated reminders
- `GET /ai/pets/:petId/status` - Get AI-generated health status

#### 3. Environment Variables

Add the following to your `.env` file:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### Frontend Integration

The frontend has been updated to:
1. Use `AIService` to call backend endpoints
2. Fallback to direct Gemini API calls if backend is unavailable
3. Properly handle authentication tokens

### How It Works

1. **Frontend Request**: iOS app calls backend endpoint with pet ID and auth token
2. **Backend Processing**:
   - Fetches pet data with medical history from MongoDB
   - Builds context-aware prompts based on pet information
   - Calls Google Gemini API
   - Parses and formats the response
3. **Response**: Returns structured JSON with tips/recommendations/reminders

### Data Flow

```
iOS App → Backend API → Gemini Service → Google Gemini API
                ↓
         MongoDB (Pet Data)
                ↓
         Formatted Response → iOS App
```

### Features

- **Tips**: Daily care tips specific to each pet
- **Recommendations**: Vaccination schedules, medication reminders, health check-ups
- **Reminders**: Actionable reminders with dates and icons
- **Status**: Health status summary with pills and summary text

### Error Handling

- Backend gracefully handles missing API keys
- Frontend falls back to direct Gemini API if backend fails
- Proper error logging and user feedback

### Security

- All endpoints require JWT authentication
- API key stored securely in environment variables
- Pet data access restricted to authenticated users

## Testing

To test the endpoints:

1. Start the backend server
2. Get a JWT token from the auth endpoint
3. Call the AI endpoints with:
   ```bash
   curl -X GET "http://localhost:3000/ai/pets/{petId}/tips" \
     -H "Authorization: Bearer {token}"
   ```

## Notes

- The backend uses rate limiting and retry logic for Gemini API calls
- Responses are cached per request to avoid duplicate calls
- The service automatically discovers the best available Gemini model

