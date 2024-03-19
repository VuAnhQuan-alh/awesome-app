import type { Metadata } from "next";
import "@mantine/core/styles.css";

import { Inter } from "next/font/google";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import QueryProvider from "@zone/libs/query-provider";
import { theme } from "@zone/libs/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://awsome-app.netlify.app/"),
  title: "My awesome app",
  description: "Generated by create next app",
  openGraph: {
    images: "/avatar.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
        <ColorSchemeScript />
      </head>

      <body className={inter.className}>
        <QueryProvider>
          <MantineProvider withCssVariables={false} theme={theme}>
            {children}
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
