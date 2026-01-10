import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Force Des Saveurs",
  description: "Patisserie en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased ">
        {children}
      </body>
    </html>
  );
}