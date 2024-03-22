"use client";

import {
  ActionIcon,
  Anchor,
  Button,
  Checkbox,
  Container,
  createTheme,
  PasswordInput,
  rem,
  Select,
  TableCaption,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { YearPickerInput } from "@mantine/dates";

import classes from "./theme.module.css";

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
      defaultProps: { color: "violet", variant: "outline", size: "sm" },
      styles: { root: { outline: "none" } },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: { size: "sm", color: "violet" },
      styles: { input: { cursor: "pointer" } },
    }),
    Container: Container.extend({ defaultProps: { px: rem(10) } }),
    Select: Select.extend({
      defaultProps: { size: "sm" },
      classNames: { input: classes.input },
    }),
    TableCaption: TableCaption.extend({ defaultProps: { mb: rem(0) } }),
    Text: Text.extend({ defaultProps: { c: "var(--mantine-color-gray-8)" } }),
    TextInput: TextInput.extend({
      defaultProps: { size: "sm" },
      classNames: { input: classes.input },
    }),
    Title: Title.extend({ defaultProps: { c: "var(--mantine-color-gray-8)" } }),
    YearPickerInput: YearPickerInput.extend({
      defaultProps: { size: "sm", h: rem(36) },
      classNames: { input: classes.input },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: { size: "sm" },
      classNames: { input: classes.input },
    }),
  },
});
export { theme };
