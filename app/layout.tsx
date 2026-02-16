import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Kleva - AI Collections Platform",
  description: "AI-powered collections infrastructure for Latin America",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <ThemeProvider>
          <ToastProvider>
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
