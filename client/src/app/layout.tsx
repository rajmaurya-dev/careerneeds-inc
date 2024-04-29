import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";


const poppins = Poppins({ weight: ["400", "500", "600", '700'], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerNeeds - Find your dream job",
  description: "An easier way to search jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
