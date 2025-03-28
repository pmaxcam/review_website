"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rating } from "@/components/ui/rating"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Product } from "@/types/database"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

export default function NewReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Fetch product details when component mounts
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const productData = await getProductById(params.id)
        setProduct(productData)
      } catch (err) {
        setError('Failed to load product details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (!title.trim()) {
      setError("Please enter a review title")
      return
    }

    if (!content.trim()) {
      setError("Please enter review content")
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      
      const response = await fetch(`/api/products/${params.id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          title,
          content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review')
      }

      // Redirect back to the product page after successful submission
      router.push(`/tools/${params.id}?tab=reviews`)
    } catch (err: unknown) {
      setError((err as Error).message || 'An error occurred while submitting your review')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button asChild>
            <Link href="/tools">Browse Tools</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={`/tools/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {product.name}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Write a Review</h1>
          <p className="text-muted-foreground">Share your experience with {product.name}</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Your Review</CardTitle>
              <CardDescription>
                Honest reviews help others make better decisions. Be specific and constructive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="bg-destructive/10 p-4 rounded-md border border-destructive text-destructive">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="pt-2">
                  <Rating value={rating} onChange={setRating} />
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {rating === 1 && "Poor - Not recommended"}
                    {rating === 2 && "Fair - Has significant issues"}
                    {rating === 3 && "Average - Does the job"}
                    {rating === 4 && "Good - Recommended"}
                    {rating === 5 && "Excellent - Highly recommended"}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Review Title</Label>
                <Input
                  id="title"
                  placeholder="Summarize your experience in one line"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Review Details</Label>
                <Textarea
                  id="content"
                  placeholder="Share your experience, likes, dislikes, and why you would or wouldn't recommend this tool"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-32"
                  maxLength={2000}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {content.length}/2000
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href={`/tools/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
} 