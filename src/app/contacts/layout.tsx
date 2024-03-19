import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts awesome",
  description: "Contacts awesome descriptions",
};
export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
