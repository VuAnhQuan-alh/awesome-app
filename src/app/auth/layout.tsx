import PageLayout from "@zone/components/core/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth In Awesome",
  description: "Auth in Awesome description",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PageLayout>{children}</PageLayout>;
}
