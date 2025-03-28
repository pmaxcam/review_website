import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get the auth code from the URL
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
    
    // Redirect to the home page or dashboard after successful authentication
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // If no code is present, redirect to login page
  return NextResponse.redirect(new URL('/login', request.url));
} 