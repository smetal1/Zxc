import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis AI | AI-Powered Security Platform",
  description:
    "Advanced AI security platform with threat detection, fraud prevention, vulnerability scanning, and compliance management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-dark-100 min-h-screen">{children}</body>
    </html>
  );
}
