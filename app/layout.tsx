import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ToastProvider } from "@/components/Toast";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

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
    <html lang="en">
      <body className="antialiased">
        <ToastProvider>
          <KeyboardShortcuts />
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
