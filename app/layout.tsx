import type { Metadata } from "next";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevCard Generator — Beautiful GitHub Profile Cards",
  description:
    "Create beautiful, customizable GitHub developer profile cards and export them as PNG in seconds.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
