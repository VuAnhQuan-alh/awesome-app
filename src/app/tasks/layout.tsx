import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks awesome",
  description: "Tasks awesome descriptions",
};
export default function TaskLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
