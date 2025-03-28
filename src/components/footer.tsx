import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-6">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              AI Reviews
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Unbiased, data-driven reviews of AI tools to help you find the best solution for your needs.
          </p>
          <div className="flex items-center space-x-3">
            <Link href="https://twitter.com/aireviews" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://github.com/aireviews" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://linkedin.com/company/aireviews" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Resources</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="text-muted-foreground hover:text-foreground transition-colors">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Company</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/methodology" className="text-muted-foreground hover:text-foreground transition-colors">
                Methodology
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 pt-8 border-t px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Reviews. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  );
} 