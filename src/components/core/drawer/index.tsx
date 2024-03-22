import { FormEvent, ReactNode } from "react";

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
import { UseFormReturnType } from "@mantine/form";
import { FormContext } from "@zone/components/context/form.context";

type IPropsDrawer<TValue> = {
  children: ReactNode;
  close: () => void;
  handleSubmit: (
    values: TValue | unknown,
    event?: FormEvent<HTMLFormElement>
  ) => void;
  form: UseFormReturnType<unknown, (values: unknown) => unknown>;
  opened: boolean;
  title: string;
};

export default function DrawerBox<T>(props: IPropsDrawer<T>) {
  return (
    <DrawerRoot position="right" opened={props.opened} onClose={props.close}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerHeader>
          <Title order={4}>{props.title}</Title>
        </DrawerHeader>

        <DrawerBody h="calc(100% - 60px)">
          <FormContext form={props.form}>
            <form
              onSubmit={props.form.onSubmit(props.handleSubmit)}
              style={{ height: "100%" }}
            >
              <Flex direction="column" h="100%">
                <Box mb="lg" flex={1} h="100%">
                  {props.children}
                </Box>

                <Group gap="xs" justify="end">
                  <Button bg="violet" type="submit" variant="field">
                    Applied
                  </Button>

                  <Button onClick={props.close}>Cancel</Button>
                </Group>
              </Flex>
            </form>
          </FormContext>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
}
