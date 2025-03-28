import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Get reviews for a product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    // Get published reviews for the product
    const { data: reviews, error, count } = await supabase
      .from('reviews')
      .select('*, users(full_name, avatar_url)', { count: 'exact' })
      .eq('product_id', productId)
      .eq('status', 'published')
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
    console.error('Reviews fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// Add a review for a product
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const cookieStore = cookies();
    
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

    // Check if product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', productId)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get request data
    const { rating, title, content } = await request.json();

    if (!rating || !title || !content || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating (1-5), title, and content are required' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this product
    const { data: existingReview, error: existingError } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', session.user.id)
      .not('status', 'eq', 'deleted')
      .single();

    if (!existingError && existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this product' },
        { status: 409 }
      );
    }

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: session.user.id,
        rating,
        title,
        content,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { review },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
} 