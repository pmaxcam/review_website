import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AI Reviews | Unbiased AI Tool Reviews and Comparisons",
  description: "Discover and compare the best AI tools with in-depth reviews, head-to-head comparisons, and user ratings from AI enthusiasts and professionals.",
  keywords: ["AI tools", "AI reviews", "AI comparison", "machine learning tools", "AI software reviews"],
  authors: [{ name: "AI Reviews Team" }],
  creator: "AI Reviews",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aireviews.com",
    title: "AI Reviews | Unbiased AI Tool Reviews and Comparisons",
    description: "Discover and compare the best AI tools with in-depth reviews, head-to-head comparisons, and user ratings.",
    siteName: "AI Reviews",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Reviews | Unbiased AI Tool Reviews and Comparisons",
    description: "Discover and compare the best AI tools with in-depth reviews, head-to-head comparisons, and user ratings.",
    creator: "@aireviews",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster position="bottom-right" />
            </AuthProvider>
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
