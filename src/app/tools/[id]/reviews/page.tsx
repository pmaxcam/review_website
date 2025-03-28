"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { ArrowLeft, MessageSquare, ThumbsUp, Timer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import { Product, Review } from "@/types/database"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type ReviewWithUser = Review & {
  users: {
    full_name: string;
    avatar_url?: string;
  }
}

// Helper to fetch product information
async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error('Failed to fetch product')
  }

  return data as Product
}

// Helper to fetch product reviews
async function getProductReviews(productId: string, page = 1, limit = 10) {
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('reviews')
    .select('*, users(full_name, avatar_url)', { count: 'exact' })
    .eq('product_id', productId)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    throw new Error('Failed to fetch reviews')
  }

  return {
    reviews: data as ReviewWithUser[],
    totalCount: count || 0
  }
}

export default function ProductReviewsPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<ReviewWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalReviews, setTotalReviews] = useState(0)
  const limit = 10

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date)
  }

  // Calculate time difference
  const getTimeDifference = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
    }
    
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`
    }
    
    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`
  }

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        
        // Get product and reviews
        const productData = await getProductById(params.id)
        const { reviews: reviewsData, totalCount } = await getProductReviews(params.id, page, limit)
        
        setProduct(productData)
        setReviews(reviewsData)
        setTotalReviews(totalCount)
        setTotalPages(Math.ceil(totalCount / limit))
      } catch (err) {
        console.error(err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [params.id, page])

  // Page navigation
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">{error || "Product not found"}</p>
          <Button asChild>
            <Link href="/tools">Browse Tools</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/tools/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {product.name}
            </Link>
          </Button>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Reviews for {product.name}</h1>
              <p className="text-muted-foreground">
                {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'} from our community
              </p>
            </div>
            
            <Button asChild>
              <Link href={`/tools/${params.id}/reviews/new`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Write a Review
              </Link>
            </Button>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No Reviews Yet</h2>
            <p className="text-muted-foreground mb-6">Be the first to review this product!</p>
            <Button asChild>
              <Link href={`/tools/${params.id}/reviews/new`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Write a Review
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 mb-8">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-muted">
                            {review.users.avatar_url && (
                              <img 
                                src={review.users.avatar_url} 
                                alt={review.users.full_name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.users.full_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(review.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Rating value={review.rating} readOnly />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {review.title}
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {review.content}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Timer className="mr-1 h-4 w-4" />
                        <span>Posted {getTimeDifference(review.created_at)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          Helpful
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 