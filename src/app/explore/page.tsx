import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Sliders, Search as SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata = {
  title: "Explore AI Tools | AI Reviews",
  description: "Browse and discover the latest and most popular AI tools across different categories.",
};

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

// Mock data for AI tools in the explore page
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
    name: "Claude 3 Opus",
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
  {
    id: 5,
    name: "Gemini Pro",
    category: "LLM",
    description: "Google's multimodal AI system that can work across text, images, audio, and more.",
    rating: 4.6,
    reviewCount: 823,
    image: "/mock/gemini.png",
    companyName: "Google",
    badges: ["Versatile"],
  },
  {
    id: 6,
    name: "DALL-E 3",
    category: "Image Generation",
    description: "Create detailed and accurate images from natural language descriptions.",
    rating: 4.5,
    reviewCount: 1032,
    image: "/mock/dalle.png",
    companyName: "OpenAI",
    badges: ["High Accuracy"],
  },
  {
    id: 7,
    name: "RunwayML Gen-2",
    category: "Video Generation",
    description: "AI system for generating and editing videos from text prompts.",
    rating: 4.4,
    reviewCount: 512,
    image: "/mock/runway.png",
    companyName: "Runway",
    badges: ["Cutting Edge"],
  },
  {
    id: 8,
    name: "Llama 3",
    category: "LLM",
    description: "Open-source large language model with impressive performance on various tasks.",
    rating: 4.5,
    reviewCount: 682,
    image: "/mock/llama.png",
    companyName: "Meta",
    badges: ["Open Source"],
  },
];

// Filter options
const categories = [
  { id: "llm", name: "LLMs & Chatbots" },
  { id: "image-generation", name: "Image Generation" },
  { id: "video-generation", name: "Video Generation" },
  { id: "audio", name: "Audio & Music" },
  { id: "data-analysis", name: "Data Analysis" },
  { id: "writing", name: "Writing & Editing" },
  { id: "search", name: "Search & Research" },
];

const pricing = [
  { id: "free", name: "Free" },
  { id: "freemium", name: "Freemium" },
  { id: "trial", name: "Free Trial" },
  { id: "subscription", name: "Subscription" },
  { id: "one-time", name: "One-time Purchase" },
];

export default function ExplorePage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Explore AI Tools</h1>
        <p className="text-xl text-muted-foreground">
          Discover and compare the latest AI tools for your specific needs
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters for desktop */}
        <div className="hidden lg:block w-64 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                className="pl-8"
              />
            </div>
          </div>

          <Accordion type="multiple" defaultValue={["categories", "pricing", "rating"]}>
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div className="flex items-center space-x-2" key={category.id}>
                      <Checkbox id={`category-${category.id}`} />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pricing">
              <AccordionTrigger>Pricing</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {pricing.map((price) => (
                    <div className="flex items-center space-x-2" key={price.id}>
                      <Checkbox id={`price-${price.id}`} />
                      <label
                        htmlFor={`price-${price.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {price.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="rating">
              <AccordionTrigger>Minimum Rating</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <div className="flex items-center space-x-2" key={rating}>
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {rating}+
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>

        <div className="flex-1 space-y-6">
          {/* Mobile search and filters */}
          <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                className="pl-8"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Sliders className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down your search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <Accordion type="multiple" defaultValue={["categories", "pricing", "rating"]}>
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <div className="flex items-center space-x-2" key={category.id}>
                              <Checkbox id={`mobile-category-${category.id}`} />
                              <label
                                htmlFor={`mobile-category-${category.id}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pricing">
                      <AccordionTrigger>Pricing</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {pricing.map((price) => (
                            <div className="flex items-center space-x-2" key={price.id}>
                              <Checkbox id={`mobile-price-${price.id}`} />
                              <label
                                htmlFor={`mobile-price-${price.id}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {price.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rating">
                      <AccordionTrigger>Minimum Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                            <div className="flex items-center space-x-2" key={rating}>
                              <Checkbox id={`mobile-rating-${rating}`} />
                              <label
                                htmlFor={`mobile-rating-${rating}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                              >
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                {rating}+
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Sort and view options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">8</span> results
            </div>
            <div className="flex gap-3 self-stretch sm:self-auto">
              <Select defaultValue="rating">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid of tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full bg-muted">
                    <div className="absolute top-2 left-2 flex gap-1">
                      {tool.badges.slice(0, 1).map((badge) => (
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

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="icon" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 