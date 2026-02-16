import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/Toast";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

export const metadata: Metadata = {
  title: "Kleva - AI Collections Platform",
  description: "AI-powered collections infrastructure for Latin America. Automate debt recovery with AI voice agents, WhatsApp, SMS, and email.",
  metadataBase: new URL("https://kleva-ui-demo.vercel.app"),
  openGraph: {
    title: "Kleva - AI Collections Platform",
    description: "Automate debt recovery with AI voice agents for Latin America",
    type: "website",
    siteName: "Kleva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kleva - AI Collections Platform",
    description: "Automate debt recovery with AI voice agents for Latin America",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <ToastProvider>
            <KeyboardShortcuts />
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
