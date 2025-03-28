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
  Award,
  LogOut
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { user, isAuthenticated, logout } = useAuth();

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tighter">AIReviews</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={pathname?.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"}
                    >
                      {item.icon}
                      {item.title}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.title} asChild>
                        <Link href={child.href}>{child.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center ${
                    pathname?.startsWith(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 pl-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tighter">AIReviews</span>
            </Link>
            <div className="my-4 w-full">
              <div className="flex flex-col space-y-3">
                {mainNavItems.map((item) =>
                  item.children ? (
                    <div key={item.title} className="mb-2">
                      <div className="flex items-center text-lg font-semibold py-1">
                        {item.icon}
                        {item.title}
                      </div>
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center text-lg font-semibold py-1"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  )
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <span className="font-bold">AIReviews</span>
        </Link>
        <div className="flex-1 md:hidden" />

        <div className="ml-auto flex items-center space-x-1">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <ThemeSwitch />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar_url} alt={user?.full_name || ""} />
                    <AvatarFallback>{user?.full_name ? getInitials(user.full_name) : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/reviews">My Reviews</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup">Sign up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
} 