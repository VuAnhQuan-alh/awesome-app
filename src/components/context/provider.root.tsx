import { ReactNode } from "react";

import TemplateProvider from "./template.context";

export default function ProviderRoot({ children }: { children: ReactNode }) {
  return <TemplateProvider>{children}</TemplateProvider>;
}
