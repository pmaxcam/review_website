"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  CircleUser, 
  Menu, 
  Search, 
  BarChart, 
  ChevronDown,
  MessageSquare,
  Zap,
  Award
} from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  {
    title: "Explore",
    icon: <Search className="mr-2 h-4 w-4" />,
    href: "/explore",
    children: [
      {
        title: "Top Rated",
        href: "/explore/top-rated",
      },
      {
        title: "New Releases",
        href: "/explore/new-releases",
      },
      {
        title: "Categories",
        href: "/categories",
      },
    ],
  },
  {
    title: "Compare",
    icon: <BarChart className="mr-2 h-4 w-4" />,
    href: "/compare",
  },
  {
    title: "Reviews",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
    href: "/reviews",
  },
  {
    title: "Tools",
    icon: <Zap className="mr-2 h-4 w-4" />,
    href: "/tools",
    children: [
      {
        title: "LLMs & Chatbots",
        href: "/categories/llm",
      },
      {
        title: "Image Generation",
        href: "/categories/image-generation",
      },
      {
        title: "Data Analysis",
        href: "/categories/data-analysis",
      },
      {
        title: "All Categories",
        href: "/categories",
      },
    ],
  },
  {
    title: "Awards",
    icon: <Award className="mr-2 h-4 w-4" />,
    href: "/awards",
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              AI Reviews
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="flex items-center space-x-2 mb-8">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  AI Reviews
                </span>
              </Link>
              <nav className="grid gap-4 py-4">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${
                      pathname?.startsWith(item.href)
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {mainNavItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-1 text-sm font-medium ${
                      pathname?.startsWith(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link href={child.href}>{child.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${
                  pathname?.startsWith(item.href)
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            )
          )}
        </nav>
        <div className="ml-auto flex items-center space-x-1">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ThemeSwitch />
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 