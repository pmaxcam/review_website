import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Get current user's reviews
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    
    // Create Supabase client with auth context
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            cookie: cookieStore.toString(),
          },
        },
      }
    );

    // Check authentication
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's reviews with associated product info
    const { data: reviews, error, count } = await supabase
      .from('reviews')
      .select('*, products(name, website_url, category)', { count: 'exact' })
      .eq('user_id', session.user.id)
      .not('status', 'eq', 'deleted')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error: unknown) {
    console.error('User reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch your reviews' },
      { status: 500 }
    );
  }
} 