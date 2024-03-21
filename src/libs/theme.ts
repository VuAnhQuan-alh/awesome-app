"use client";

import {
  ActionIcon,
  Anchor,
  Button,
  Checkbox,
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
    ActionIcon: ActionIcon.extend({
      defaultProps: { variant: "light" },
    }),
    Anchor: Anchor.extend({
      defaultProps: { c: "var(--mantine-color-anchor)" },
    }),
    Button: Button.extend({
      defaultProps: { color: "violet", variant: "outline", size: "xs" },
      styles: { root: { outline: "none" } },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: { size: "xs", color: "violet" },
      styles: { input: { cursor: "pointer" } },
    }),
    Container: Container.extend({ defaultProps: { px: rem(10) } }),
    Select: Select.extend({ defaultProps: { size: "xs" } }),
    TableCaption: TableCaption.extend({ defaultProps: { mb: rem(0) } }),
    Text: Text.extend({ defaultProps: { c: "var(--mantine-color-gray-8)" } }),
    TextInput: TextInput.extend({ defaultProps: { size: "xs" } }),
    Title: Title.extend({ defaultProps: { c: "var(--mantine-color-gray-8)" } }),
  },
});
export { theme };
