import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sign in to Outlook",
  description: "Sign in to your Microsoft account to access Outlook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
