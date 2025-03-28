import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Search products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!query) {
      return NextResponse.json(
        { error: 'Search query parameter is required' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    // Basic search implementation
    const { data: products, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' })
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error: unknown) {
    console.error('Product search error:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
} 