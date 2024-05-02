"use client";

import { ReactNode } from "react";

import { Button, Container, Group, rem, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { AuthConsumer } from "../context/auth.context";

type IProps = {
  children: ReactNode;
  title: string;
  onCreate?: () => void;
  auth?: boolean;
};

const PageTemplate = (props: IProps) => {
  const { children, title, onCreate, auth = false } = props;

  return (
    <Container h={rem(70)} py="md">
      <AuthConsumer>
        {(authentication) => {
          if (auth && !authentication?.user) {
            return <>Not authentication</>;
          } else {
            return (
              <>
                <Group justify="space-between" align="center" px="xs" mb="md">
                  <Title order={2} tt="capitalize">
                    {title}
                  </Title>

                  {onCreate && (
                    <Button
                      onClick={onCreate}
                      variant="field"
                      bg="violet"
                      leftSection={<IconPlus size="1rem" />}
                    >
                      Create new entry
                    </Button>
                  )}
                </Group>
                {children}
              </>
            );
          }
        }}
      </AuthConsumer>
    </Container>
  );
};
export default PageTemplate;
