import { ReactNode } from "react";

import AuthProvider from "./auth.context";
import TemplateProvider from "./template.context";

export default function ProviderRoot({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TemplateProvider>{children}</TemplateProvider>;
    </AuthProvider>
  );
}
