import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#c23616",
          colorBackground: "#1a1612",
          colorInputBackground: "#221e19",
          colorText: "#f4f0e8",
          colorTextSecondary: "#8a8278",
          borderRadius: "0.5rem",
        },
      }}
    >
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
