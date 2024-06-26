import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dotenv from "dotenv";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SolidEat",
    description: "Regroupe les restaurants solidaires de Paris",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    dotenv.config();
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
