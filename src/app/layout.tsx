import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/providers/SessionProvider";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { CommandMenu } from "@/components/search/command-menu";

// const outfit = Outfit({
//   variable: "--font-outfit",
//   subsets: ["latin"],
//   display: "swap",
// });

const outfit = { variable: "font-outfit" }; 

export const metadata: Metadata = {
  title: "MindBridge - Mental Health Navigator",
  description: "Your safe space for mental wellness and navigation.",
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

            <SearchProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <CommandMenu />
              </ThemeProvider>
            </SearchProvider>

        </AuthProvider>
      </body>
    </html>
  );
}
