# Setting Up Your AI Review Website Backend

This guide will help you complete the setup of your AI Review Website's Supabase backend.

## Supabase Setup Steps

1. **Create Supabase Tables**
   
   Go to the [Supabase Dashboard](https://app.supabase.com/) and navigate to your project's SQL Editor.
   
   Copy and paste the SQL from the `supabase-setup.sql` file in this project, then run it to create:
   - Users table
   - Products table
   - Reviews table
   - Row Level Security policies
   - Necessary indexes
   - Utility functions

2. **Configure Authentication**

   Navigate to Authentication → Settings in your Supabase dashboard:
   
   - Set the Site URL to your application URL (e.g., `http://localhost:3000` for development)
   - Enable Email provider
   - Configure Email templates (optional)
   - Set up a redirect URL for email confirmations: `http://localhost:3000/auth/callback`
   
   For Google OAuth (optional):
   - Enable Google provider
   - Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/)
   - Add the Client ID and Secret to Supabase
   - Add authorized redirect URIs in Google: `https://your-project-ref.supabase.co/auth/v1/callback`

3. **Set Up Storage (for avatars)**

   Navigate to Storage in your Supabase dashboard:
   
   - Create a new bucket called `avatars`
   - Set the bucket to private
   - Create a policy to allow authenticated users to upload, update, and retrieve their own avatar images

## Testing the APIs

Once your Supabase setup is complete, you can test the API endpoints using tools like Postman or curl:

1. **Create a new user**
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "securepassword", "fullName": "Test User"}'
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "securepassword"}'
   ```

3. **Create a product**
   ```bash
   curl -X POST http://localhost:3000/api/products \
     -H "Content-Type: application/json" \
     -H "Cookie: <session-cookie-from-login>" \
     -d '{"name": "AI Assistant", "description": "A powerful AI assistant", "website_url": "https://example.com", "category": "Productivity"}'
   ```

4. **Get all products**
   ```bash
   curl http://localhost:3000/api/products
   ```

## Troubleshooting

- **Authentication issues**: Check that your Supabase URL and keys are correctly set in `.env.local`.
- **Database errors**: Look at the PostgreSQL logs in the Supabase dashboard.
- **RLS policy errors**: Make sure the user has the correct permissions for the operation.

## Next Steps

1. Create a frontend implementation for authentication
2. Build product listing and detail pages
3. Implement review functionality
4. Add user profile management 