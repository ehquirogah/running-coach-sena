import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/components/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Running Coach",
  description: "Plataforma web para planificación y análisis de entrenamientos de corredores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#F9FAFB] text-[#111827] flex flex-col min-h-screen antialiased`}>
        <NextAuthProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'font-medium text-sm rounded-lg shadow-lg border border-gray-100',
              success: {
                iconTheme: { primary: '#16A34A', secondary: '#fff' },
              },
            }}
          />
        </NextAuthProvider>
      </body>
    </html>
  );
}
