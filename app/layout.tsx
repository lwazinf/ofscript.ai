"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav_ from "./components/nav_/Nav_";
import { RecoilRoot } from "recoil";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "OfScript.ai",
  description: "Generate faceless media on the go..",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const titleHTML = '<span style="color: blue;">OfScript.ai</span>';
  const descriptionHTML = "Generate faceless media on the <strong>go</strong>.";
  return (
    <html lang="en">
      <Head>
        <title dangerouslySetInnerHTML={{ __html: titleHTML }} />
        <meta
          name="description"
          content={descriptionHTML}
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
      </Head>
      <body className={inter.className}>
        <RecoilRoot>
          {children}
          <Nav_ />
        </RecoilRoot>
      </body>
    </html>
  );
}
