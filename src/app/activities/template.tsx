import { ReactNode } from "react";

import PageTemplate from "@zone/components/core/template";

export default function Template({ children }: { children: ReactNode }) {
  return <PageTemplate title="Title activities">{children}</PageTemplate>;
}
