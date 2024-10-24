
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SessionWrapper from "./components/Sessionwrapper"; 

export const metadata: Metadata = {
  title: "Note App",
  description: "Note App that helps you create, delete, edit, and update notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <SessionWrapper>
          <Header />
          <main className="flex-1 flex bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
