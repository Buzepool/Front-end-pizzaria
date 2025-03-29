import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boot-Camp Full Stack Lamia",
  description: "Pedro Lucas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "bg-white text-black border border-black rounded-lg",
            style: {
              backgroundColor: "#f1f1f1",
              color: "#131313",
              border: "1px solid #000",
              borderRadius: "8px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
