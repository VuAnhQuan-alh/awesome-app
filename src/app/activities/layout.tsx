import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities awesome",
  description: "Activities awesome descriptions",
};
export default function ActiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
