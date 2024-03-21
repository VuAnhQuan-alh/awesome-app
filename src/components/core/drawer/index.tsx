import { ReactNode } from "react";

import {
  Box,
  Button,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerRoot,
  Flex,
  Group,
  Title,
} from "@mantine/core";
import { FormState } from "@tanstack/react-form";
import { NoInfer } from "@tanstack/react-query";

type IPropsDrawer = {
  children: ReactNode;
  close: () => void;
  handleSubmit: () => Promise<void>;
  opened: boolean;
  Subscribe: <TSelected = FormState<unknown>>(props: {
    children: ReactNode | ((state: NoInfer<TSelected>) => ReactNode);
    selector?: ((state: FormState<unknown>) => TSelected) | undefined;
  }) => JSX.Element;
  title: string;
};

export default function DrawerBox(props: IPropsDrawer) {
  const { children, close, handleSubmit, opened, Subscribe, title } = props;

  return (
    <DrawerRoot position="right" opened={opened} onClose={close}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader>
          <Title order={4}>{title}</Title>
        </DrawerHeader>

        <DrawerBody h="calc(100% - 60px)">
          <form
            onSubmit={(e) => {
              console.log("vao day roi");
              e.preventDefault();
              e.stopPropagation();
              void handleSubmit();
            }}
            style={{ height: "100%" }}
          >
            <Flex direction="column" h="100%">
              <Box mb="lg" flex={1} h="100%">
                {children}
              </Box>

              <Group gap="xs" justify="end">
                <Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      bg="violet"
                      disabled={!canSubmit}
                      type="submit"
                      variant="field"
                    >
                      {isSubmitting ? "..." : "Applied"}
                    </Button>
                  )}
                </Subscribe>

                <Button onClick={close}>Cancel</Button>
              </Group>
            </Flex>
          </form>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}
