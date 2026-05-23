import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ahmad Triadi Julianto M — Portfolio",
  description:
    "Exploring the intersection of curiosity, code, and data. Research · Internship · Competition — a journey charted through projects.",
  openGraph: {
    title: "Ahmad Triadi Julianto M — Portfolio",
    description:
      "Exploring the intersection of curiosity, code, and data. Research · Internship · Competition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
