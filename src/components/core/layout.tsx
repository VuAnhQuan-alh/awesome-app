import { ReactNode, Suspense } from "react";

import { Loader } from "@mantine/core";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loader color="violet" type="bars" />}>
      {children}
    </Suspense>
  );
}
