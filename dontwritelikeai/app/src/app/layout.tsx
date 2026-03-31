import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Don't Write Like AI — Kill the Robot Voice",
  description:
    "Paste your AI-generated text and get back something that actually sounds human. Free rewrites daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
