import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { H1 } from "@/components/ui/typo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RECACT",
  description: "Activity Recorder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="mx-4">
            <nav>
              <Link href="/" className="hover:text-red-500">
                <H1>Recact</H1>
              </Link>
            </nav>
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
