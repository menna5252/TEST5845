import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "swiper/css";
import "swiper/css/pagination";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/Providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exclusive",
  description: "Exclusive Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
