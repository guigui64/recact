import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { H1 } from "@/components/ui/typo";
import { GeistSans } from "geist/font/sans";

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
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="mx-4">
            <nav>
              <Link href="/" className="hover:text-red-500">
                <H1>Recact</H1>
              </Link>
            </nav>
            {children}
            <footer className="my-8 text-sm flex justify-center text-muted-foreground">
              Built with ❤️ by
              <Link
                href="https://guillaumecomte.deno.dev"
                className="ml-1 hover:text-red-500"
                target="_blank"
              >
                Guillaume Comte
              </Link>
            </footer>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
