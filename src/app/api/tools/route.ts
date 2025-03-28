import { NextResponse } from "next/server";

// Mock data for tools
const tools = [
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

// GET handler for returning all tools
export async function GET(request: Request) {
  // Get URL search params for filtering and pagination
  const { searchParams } = new URL(request.url);
  
  // Example filtering by category
  const category = searchParams.get("category");
  let filteredTools = tools;
  
  if (category) {
    filteredTools = tools.filter(tool => 
      tool.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Example pagination
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedTools = filteredTools.slice(startIndex, endIndex);
  
  return NextResponse.json({
    tools: paginatedTools,
    pagination: {
      total: filteredTools.length,
      page,
      limit,
      pages: Math.ceil(filteredTools.length / limit)
    }
  });
}

// POST handler for adding a new tool (in a real app this would connect to a database)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.category || !body.description || !body.companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // In a real app, you would save this to a database
    // For this demo, we'll just return the submitted data with a mock ID
    const newTool = {
      id: tools.length + 1,
      ...body,
      rating: 0,
      reviewCount: 0,
      badges: [],
    };
    
    return NextResponse.json(newTool, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
} 