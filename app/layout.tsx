import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UsersStoreProvider } from "@/components/UsersStoreProvider";
import { getUsers } from "./api/getUsers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WikiStories",
  description: "An instagram stories clone",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const users = await getUsers();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UsersStoreProvider users={users}>
          {children} {modal}
          <div id="modal-root" />
        </UsersStoreProvider>
      </body>
    </html>
  );
}
