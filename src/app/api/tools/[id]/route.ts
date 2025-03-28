import { NextResponse } from "next/server";

// Detailed mock data for a tool
const getToolById = (id: string) => {
  const toolId = parseInt(id);
  
  // This is a mock - in a real application this would fetch from a database
  return {
    id: toolId,
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // In a real app, you would fetch from a database based on the ID
    const tool = getToolById(id);
    
    if (!tool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tool);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tool" },
      { status: 500 }
    );
  }
}

// In a real app, you would also include PUT and DELETE handlers for updating and deleting tools
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // In a real app, you would update a database record
    // For this demo, we'll just return a mock updated tool
    const updatedTool = {
      id: parseInt(id),
      ...body,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    
    return NextResponse.json(updatedTool);
  } catch {
    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // In a real app, you would delete from a database
    // For this demo, we'll just return a success message
    return NextResponse.json(
      { message: `Tool with ID ${id} deleted successfully` },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete tool" },
      { status: 500 }
    );
  }
} 