import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, HelpCircle, Star, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "Compare AI Tools | AI Reviews",
  description: "Side-by-side comparison of the top AI tools to help you make the best choice for your specific needs.",
};

// Mock data for comparison
const comparisonData = [
  {
    id: 1,
    name: "ChatGPT Pro",
    companyName: "OpenAI",
    rating: 4.8,
    price: "$20/month",
    description: "Advanced conversational AI with exceptional reasoning capabilities and knowledge up to 2023.",
    features: {
      api: true,
      freeVersion: true,
      multilingual: true,
      pluginSupport: true,
      codeGeneration: true,
    },
    category: "LLM",
  },
  {
    id: 3,
    name: "Claude 3 Opus",
    companyName: "Anthropic",
    rating: 4.7,
    price: "$25/month",
    description: "Highly capable language model with robust reasoning and understanding abilities.",
    features: {
      api: true,
      freeVersion: false,
      multilingual: true,
      pluginSupport: false,
      codeGeneration: true,
    },
    category: "LLM",
  },
  {
    id: 5,
    name: "Gemini Pro",
    companyName: "Google",
    rating: 4.6,
    price: "$19.99/month",
    description: "Google's multimodal AI system that can work across text, images, audio, and more.",
    features: {
      api: true,
      freeVersion: true,
      multilingual: true,
      pluginSupport: true,
      codeGeneration: true,
    },
    category: "LLM",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Compare AI Tools</h1>
        <p className="text-xl text-muted-foreground">
          Side-by-side comparison of the leading AI tools to help you make an informed decision
        </p>
      </div>

      <Tabs defaultValue="features" className="w-full mb-12">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Tool</TableHead>
                      <TableHead className="text-center">API Access</TableHead>
                      <TableHead className="text-center">Free Version</TableHead>
                      <TableHead className="text-center">Multilingual</TableHead>
                      <TableHead className="text-center">Plugin Support</TableHead>
                      <TableHead className="text-center">Code Generation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell className="font-medium">
                          <div className="font-semibold">{tool.name}</div>
                          <div className="text-sm text-muted-foreground">{tool.companyName}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          {tool.features.api ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {tool.features.freeVersion ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {tool.features.multilingual ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {tool.features.pluginSupport ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {tool.features.codeGeneration ? (
                            <Check className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Tool</TableHead>
                      <TableHead>Monthly Price</TableHead>
                      <TableHead>Free Tier</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell className="font-medium">
                          <div className="font-semibold">{tool.name}</div>
                          <div className="text-sm text-muted-foreground">{tool.companyName}</div>
                        </TableCell>
                        <TableCell>{tool.price}</TableCell>
                        <TableCell>
                          {tool.features.freeVersion ? "Available" : "Not available"}
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/tools/${tool.id}/pricing`}>
                              View Details
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ratings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ratings Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Tool</TableHead>
                      <TableHead>Overall Rating</TableHead>
                      <TableHead>Ease of Use</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Value for Money</TableHead>
                      <TableHead>Reviews</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell className="font-medium">
                          <div className="font-semibold">{tool.name}</div>
                          <div className="text-sm text-muted-foreground">{tool.companyName}</div>
                        </TableCell>
                        <TableCell>
                          <StarRating rating={tool.rating} />
                        </TableCell>
                        <TableCell>
                          <StarRating rating={tool.rating - 0.1} />
                        </TableCell>
                        <TableCell>
                          <StarRating rating={tool.rating + 0.1} />
                        </TableCell>
                        <TableCell>
                          <StarRating rating={tool.rating - 0.2} />
                        </TableCell>
                        <TableCell>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/tools/${tool.id}/reviews`}>
                              Read Reviews
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 rounded-lg p-8 border">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">Need help choosing the right AI tool?</h2>
            <p className="text-muted-foreground">
              Our AI-powered recommendation engine can suggest the perfect tool based on your specific requirements.
            </p>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Answer a few questions and get personalized recommendations.
              </span>
            </div>
          </div>
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
            <Link href="/recommendation-quiz">
              Get Personalized Recommendations
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 