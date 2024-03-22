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
import { YearPickerInput } from "@mantine/dates";

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: { variant: "light" },
      styles: { root: { outline: "none" } },
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
    Select: Select.extend({
      defaultProps: { size: "xs" },
      styles: { input: { borderColor: "var(--mantine-color-violet-5)" } },
    }),
    TableCaption: TableCaption.extend({ defaultProps: { mb: rem(0) } }),
    Text: Text.extend({ defaultProps: { c: "var(--mantine-color-gray-8)" } }),
    TextInput: TextInput.extend({
      defaultProps: { size: "xs" },
      styles: { input: { borderColor: "var(--mantine-color-violet-5)" } },
    }),
    Title: Title.extend({ defaultProps: { c: "var(--mantine-color-gray-8)" } }),
    YearPickerInput: YearPickerInput.extend({
      defaultProps: { size: "xs", h: rem(30) },
      styles: {
        input: {
          borderColor: "var(--mantine-color-violet-5)",
          height: rem(30),
        },
      },
    }),
  },
});
export { theme };
