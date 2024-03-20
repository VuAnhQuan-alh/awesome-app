import { ReactNode } from "react";

import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerRoot,
  Title,
} from "@mantine/core";

type IPropsDrawer = {
  opened: boolean;
  close: () => void;
  title: string;
  onSubmit: () => void;
  children: ReactNode;
};

export default function DrawerBox(props: IPropsDrawer) {
  const { opened, close, title, onSubmit, children } = props;

  return (
    <DrawerRoot position="right" opened={opened} onClose={close}>
      <DrawerOverlay />

      <DrawerContent>
        <form>
          <DrawerHeader>
            <Title order={4}>{title}</Title>
          </DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
        </form>
      </DrawerContent>
    </DrawerRoot>
  );
}
