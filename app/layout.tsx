import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Toolbox - Простые инструменты для everyday-задач",
    template: "%s | Toolbox",
  },
  description:
    "Быстрые утилиты для работы с текстом, цветом, паролями и данными. Ничего лишнего, без регистрации.",
  openGraph: {
    title: "Toolbox - Простые инструменты для everyday-задач",
    description:
      "Быстрые утилиты для работы с текстом, цветом, паролями и данными.",
    siteName: "Toolbox",
    images: [
      {
        url: "/og-toolbox.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-950">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
