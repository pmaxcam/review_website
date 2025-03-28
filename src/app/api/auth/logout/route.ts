import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function POST() {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Clear auth cookies in the response
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.delete('sb-access-token');
    response.cookies.delete('sb-refresh-token');

    return response;
  } catch (error: unknown) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 