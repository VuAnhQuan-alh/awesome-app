import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "dayjs/locale/vi";

import { Inter } from "next/font/google";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
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

      <body suppressHydrationWarning={true} className={inter.className}>
        <QueryProvider>
          <MantineProvider withCssVariables={false} theme={theme}>
            <Notifications />
            <DatesProvider
              settings={{
                locale: "vi",
                firstDayOfWeek: 0,
                weekendDays: [0],
                timezone: "UTC",
              }}
            >
              {children}
            </DatesProvider>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
