import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { getAuth } from "./utils/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  const { userAuth, userName } = getAuth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="mx-12 my-6 flex justify-between">
          <div>
            <strong>Prueba Tecnica</strong>
          </div>
          <div className="flex gap-4">
            {userAuth
              ? (
                <span>{userName}</span>
              )
              : (
                <>
                  <Link href='/singin'>Sign in</Link>
                  <Link href='/login'>Login</Link>
                </>
              )
            }

          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
