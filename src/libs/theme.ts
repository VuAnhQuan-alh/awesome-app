"use client";

import {
  Anchor,
  Button,
  Container,
  createTheme,
  rem,
  Select,
  TableCaption,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "violet",
        variant: "outline",
        size: "xs",
      },
    }),
    Container: Container.extend({
      defaultProps: {
        px: rem(10),
      },
    }),
    Title: Title.extend({
      defaultProps: {
        c: "var(--mantine-color-gray-8)",
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        c: "var(--mantine-color-anchor)",
      },
    }),
    Text: Text.extend({
      defaultProps: {
        c: "var(--mantine-color-gray-8)",
      },
    }),
    TableCaption: TableCaption.extend({
      defaultProps: {
        mb: rem(0),
      },
    }),
    Select: Select.extend({
      defaultProps: {
        size: "xs",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: "xs",
      },
    }),
  },
});
export { theme };
