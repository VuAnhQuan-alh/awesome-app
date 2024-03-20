import { ReactNode, Suspense } from "react";

import { Box, Loader } from "@mantine/core";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader color="violet" type="bars" />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
}
