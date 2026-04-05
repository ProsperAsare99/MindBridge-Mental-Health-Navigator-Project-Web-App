import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/SessionProvider";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { AdaptiveThemeProvider } from "@/components/providers/AdaptiveThemeProvider";
import { CommandMenu } from "@/components/search/command-menu";
import { ConnectivityBanner } from "@/components/brand/ConnectivityBanner";
import { FramerProvider } from "@/components/providers/FramerProvider";

// const outfit = Outfit({
//   variable: "--font-outfit",
//   subsets: ["latin"],
//   display: "swap",
// });

const outfit = { variable: "font-outfit" }; 

export const metadata: Metadata = {
  title: "MindBridge | AI-Powered Mental Health Navigator",
  description: "A safe, AI-driven space for mental wellness, peer support, and resilience tracking tailored for students.",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
      >
        <AuthProvider>
          <FramerProvider>
            <SearchProvider>
              <AdaptiveThemeProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <CommandMenu />
                <ConnectivityBanner />
              </ThemeProvider>
              </AdaptiveThemeProvider>
            </SearchProvider>
          </FramerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
