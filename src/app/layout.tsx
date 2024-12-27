import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/Nav";
import InitialLoading from "@/components/InitialLoading";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artzy",
  description:
    "Discover and explore a curated collection of artworks from around the world. Journey through centuries of creativity, from classical masterpieces to contemporary expressions. Immerse yourself in detailed artwork that shaped history.",
  generator: "Next.js",
  keywords: "art, artwork, paintings, sculptures, artists, history, culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Default theme is system  
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          <InitialLoading>
            <div className="z-10 relative">
              <Nav />
            </div>
            {children}
          </InitialLoading>
        </ThemeProvider>
      </body>
    </html>
  );
}
