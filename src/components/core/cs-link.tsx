"use client";
import Link from "next/link";
import { ReactNode } from "react";

import { Button, ButtonProps } from "@mantine/core";

interface IProps extends ButtonProps {
  children: ReactNode | string;
  href: string;
}

export default function CsLink(props: IProps) {
  const { children } = props;
  return (
    <Button component={Link} {...props}>
      {children}
    </Button>
  );
}
