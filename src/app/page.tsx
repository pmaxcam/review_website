import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Zap, BarChart, Award, TrendingUp } from "lucide-react";

// Mock data for featured AI tools
const featuredTools = [
  {
    id: 1,
    name: "ChatGPT Pro",
    category: "LLM",
    description: "Advanced conversational AI with exceptional reasoning capabilities and knowledge up to 2023.",
    rating: 4.8,
    reviewCount: 2123,
    image: "/mock/chatgpt.png",
    companyName: "OpenAI",
    badges: ["Editor's Choice", "Best for Writing"],
  },
  {
    id: 2,
    name: "Midjourney V6",
    category: "Image Generation",
    description: "Create stunning AI art and photo-realistic images with simple text prompts.",
    rating: 4.9,
    reviewCount: 1857,
    image: "/mock/midjourney.png",
    companyName: "Midjourney",
    badges: ["Best in Class", "Top Rated"],
  },
  {
    id: 3,
    name: "Anthropic Claude 3",
    category: "LLM",
    description: "Highly capable language model with robust reasoning and understanding abilities.",
    rating: 4.7,
    reviewCount: 945,
    image: "/mock/claude.png",
    companyName: "Anthropic",
    badges: ["Rising Star"],
  },
  {
    id: 4,
    name: "Perplexity AI",
    category: "Search",
    description: "AI-powered search engine that provides direct answers with cited sources.",
    rating: 4.6,
    reviewCount: 712,
    image: "/mock/perplexity.png",
    companyName: "Perplexity Labs",
    badges: ["Most Innovative"],
  },
];

// Categories
const categories = [
  { name: "LLMs & Chatbots", icon: <Zap className="h-5 w-5" />, count: 156, href: "/categories/llm" },
  { name: "Image Generation", icon: <Star className="h-5 w-5" />, count: 89, href: "/categories/image-generation" },
  { name: "Video Generation", icon: <TrendingUp className="h-5 w-5" />, count: 42, href: "/categories/video-generation" },
  { name: "Audio & Music", icon: <BarChart className="h-5 w-5" />, count: 73, href: "/categories/audio" },
  { name: "Data Analysis", icon: <Award className="h-5 w-5" />, count: 67, href: "/categories/data-analysis" },
];

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px]" />
        <div className="container relative px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <div className="space-y-6 px-4 md:px-6">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                <span className="text-gradient-to-r from-purple-500 to-blue-500">
                  The #1 AI Tools Review Platform
                </span>
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
                Find the Perfect <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">AI Tools</span> for Your Needs
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
                Compare, review, and discover the best AI tools with our unbiased, data-driven insights from AI experts and the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  <Link href="/explore">
                    Explore AI Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/compare">Compare Top Tools</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 blur-sm" />
              <div className="relative bg-background/90 backdrop-blur-sm rounded-lg border shadow-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-md bg-card p-3 border">
                      <div className="h-24 w-full rounded-md bg-muted animate-pulse" />
                      <div className="h-4 w-2/3 mt-3 rounded-md bg-muted animate-pulse" />
                      <div className="h-3 w-1/2 mt-2 rounded-md bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-8 w-1/2 mx-auto rounded-full bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">10,000+</span>
              <span className="text-muted-foreground text-sm">Reviews</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">500+</span>
              <span className="text-muted-foreground text-sm">AI Tools</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">50,000+</span>
              <span className="text-muted-foreground text-sm">Monthly Visitors</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">24</span>
              <span className="text-muted-foreground text-sm">Expert Reviewers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured AI Tools */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured AI Tools</h2>
              <p className="text-muted-foreground mt-2">
                Discover top-rated AI tools recommended by our experts
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/explore">View All Tools</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full bg-muted">
                    <div className="absolute top-2 left-2 flex gap-1">
                      {tool.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{tool.category}</Badge>
                    <div className="flex items-center gap-1">
                      <StarRating rating={tool.rating} />
                      <span className="text-xs text-muted-foreground">({tool.reviewCount})</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-1">{tool.name}</CardTitle>
                  <div className="text-xs text-muted-foreground mb-3">by {tool.companyName}</div>
                  <CardDescription className="line-clamp-3">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/tools/${tool.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className="group flex flex-col items-center p-6 bg-card hover:bg-card/80 rounded-lg border transition-colors"
              >
                <div className="p-3 mb-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {category.icon}
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">How AI Reviews Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our rigorous review process ensures you get unbiased, accurate information about AI tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Expert Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team of AI specialists thoroughly tests each tool against consistent benchmarks and real-world scenarios.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Community Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Verified user reviews provide real-world perspectives from people using these tools in diverse environments.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Data-Driven Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We combine quantitative metrics and qualitative assessments to create comprehensive, fair ratings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600/10 to-blue-500/10">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to find your perfect AI tool?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of professionals using our platform to make informed decisions about AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                <Link href="/explore">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/signup">Sign Up &mdash; It&apos;s Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
