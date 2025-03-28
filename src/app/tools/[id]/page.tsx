import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Star,
  ThumbsUp,
  Timer,
  Zap,
} from "lucide-react";

// Mock data - in a real app, this would be fetched from an API based on the ID
const getToolById = (id: string) => {
  // Here you would typically fetch data from an API
  // For now, we'll return mock data
  return {
    id: parseInt(id),
    name: "ChatGPT Pro",
    companyName: "OpenAI",
    companyUrl: "https://openai.com",
    category: "LLM",
    description:
      "ChatGPT is an advanced conversational AI that can understand complex requests, follow instructions, solve problems, and generate diverse content from text to creative writing and code.",
    rating: 4.8,
    reviewCount: 2123,
    badges: ["Editor's Choice", "Best for Writing"],
    pricing: {
      type: "Subscription",
      free: true,
      freeTierFeatures: ["Limited messages", "Basic capabilities", "Web-only access"],
      paid: true,
      paidPlans: [
        {
          name: "ChatGPT Plus",
          price: "$20/month",
          features: [
            "Priority access during peak times",
            "Faster response speed",
            "Early access to new features",
            "API access (limited)",
          ],
        },
        {
          name: "ChatGPT Team",
          price: "$25/user/month",
          features: [
            "All Plus features",
            "Team workspace",
            "Shared chat history",
            "Admin console",
          ],
        },
        {
          name: "ChatGPT Enterprise",
          price: "Contact for pricing",
          features: [
            "All Team features",
            "Advanced security features",
            "Extended context window",
            "Priority support",
          ],
        },
      ],
    },
    keyFeatures: [
      "Conversational interface",
      "Natural language understanding",
      "Creative content generation",
      "Problem-solving abilities",
      "Code generation and debugging",
      "Web browsing capabilities",
      "Plugins and extensions",
      "File upload and analysis",
    ],
    pros: [
      "Highly versatile for various tasks",
      "User-friendly interface",
      "Regular updates and improvements",
      "Extensive knowledge base",
      "Good at understanding context",
    ],
    cons: [
      "Can occasionally hallucinate information",
      "Limited knowledge cutoff date",
      "Subscription required for advanced features",
      "Can be slow during peak usage times",
    ],
    useCases: [
      "Content creation and editing",
      "Research assistance",
      "Programming help",
      "Learning and education",
      "Creative writing",
    ],
    alternatives: [
      { id: 3, name: "Claude 3", company: "Anthropic" },
      { id: 5, name: "Gemini Pro", company: "Google" },
      { id: 8, name: "Llama 3", company: "Meta" },
    ],
    websiteUrl: "https://openai.com/chatgpt",
    lastUpdated: "2023-09-15",
  };
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
      <span className="ml-1 text-base font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ToolDetailPage({ params, searchParams }: { 
  params: { id: string },
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const tool = getToolById(params.id);
  const defaultTab = searchParams?.tab as string || "overview";
  
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{tool.category}</Badge>
              {tool.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {badge}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <StarRating rating={tool.rating} />
                <span className="ml-2 text-muted-foreground">
                  ({tool.reviewCount} reviews)
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                By{" "}
                <a
                  href={tool.companyUrl}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tool.companyName}
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                Updated: {tool.lastUpdated}
              </div>
            </div>
          </div>

          <div className="relative h-[300px] rounded-lg overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground">Tool Screenshot</span>
            </div>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About {tool.name}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
                    Pros
                  </h3>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <ThumbsUp className="mr-2 h-5 w-5 text-red-500 rotate-180" />
                    Cons
                  </h3>
                  <ul className="space-y-2">
                    {tool.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Best Use Cases
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {tool.useCases.map((useCase, index) => (
                    <li
                      key={index}
                      className="bg-muted rounded-md px-4 py-3 flex items-center"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2 text-primary" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="features" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start border rounded-lg p-4"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Pricing Plans</h2>
              {tool.pricing.free && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        Free
                      </Badge>
                      Free Tier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tool.pricing.freeTierFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tool.pricing.paidPlans.map((plan, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <CardTitle>{plan.name}</CardTitle>
                      <p className="text-2xl font-bold mt-2">{plan.price}</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">User Reviews</h2>
                <Button asChild>
                  <Link href={`/tools/${tool.id}/reviews/new`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write a Review
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map((index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-muted" />
                            <div>
                              <h4 className="font-semibold">User Name {index}</h4>
                              <p className="text-sm text-muted-foreground">
                                Product Designer
                              </p>
                            </div>
                          </div>
                        </div>
                        <StarRating rating={4 + index * 0.2} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Great tool for day-to-day tasks
                      </h3>
                      <p className="text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus luctus magna at diam ultricies, eget tempus odio
                        tincidunt. Donec facilisis ex sapien, vel condimentum
                        orci efficitur non.
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Timer className="mr-1 h-4 w-4" />
                          <span>Posted 3 days ago</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            Helpful (12)
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link href={`/tools/${tool.id}/reviews`}>
                    Read All {tool.reviewCount} Reviews
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="alternatives" className="space-y-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Alternative Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tool.alternatives.map((alt) => (
                  <Card key={alt.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-full bg-muted mb-4" />
                      <h3 className="text-xl font-bold mb-1">{alt.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {alt.company}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/tools/${alt.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                  <Link href="/compare">
                    Compare These Tools
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <Button asChild size="lg" className="w-full">
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Link href={`/tools/${tool.id}/reviews/new`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write a Review
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold">{tool.rating}</div>
                <div className="space-y-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(tool.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {tool.reviewCount} reviews
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Category</dt>
                  <dd className="font-medium">{tool.category}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Company</dt>
                  <dd className="font-medium">{tool.companyName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Pricing Model
                  </dt>
                  <dd className="font-medium">{tool.pricing.type}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Free Plan</dt>
                  <dd className="font-medium">
                    {tool.pricing.free ? "Available" : "Not available"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">
                    Last Updated
                  </dt>
                  <dd className="font-medium">{tool.lastUpdated}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 