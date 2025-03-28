import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const token = url.searchParams.get('token');
  const type = url.searchParams.get('type');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  
  // Handle OAuth code exchange
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Handle email verification
  if (token && type === 'signup') {
    try {
      // Verify the email with the token
      await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'signup',
      });
      
      // Redirect to login page with success message
      return NextResponse.redirect(new URL('/auth/login?verified=true', request.url));
    } catch (error) {
      console.error('Email verification error:', error);
      return NextResponse.redirect(new URL('/auth/login?error=verification_failed', request.url));
    }
  }
  
  // Handle password reset
  if (token && type === 'recovery') {
    return NextResponse.redirect(new URL(`/auth/reset-password?token=${token}`, request.url));
  }
  
  // If no valid parameters are present, redirect to login page
  return NextResponse.redirect(new URL('/auth/login', request.url));
} 