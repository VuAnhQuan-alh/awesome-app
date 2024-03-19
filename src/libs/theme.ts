"use client";

import { Button, Container, createTheme, rem } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "cyan",
        variant: "outline",
      },
    }),
    Container: Container.extend({
      defaultProps: {
        px: rem(10),
      },
    }),
  },
});
export { theme };
