import { ReactNode } from "react";

import { Button, Container, Group, rem, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type IProps = {
  children: ReactNode;
  title: string;
  onCreate?: () => void;
};

const PageTemplate = (props: IProps) => {
  const { children, title, onCreate } = props;

  return (
    <Container h={rem(70)} py="md">
      <Group justify="space-between" align="center" px="xs" mb="md">
        <Title order={2} tt="capitalize">
          {title}
        </Title>

        {onCreate && (
          <Group>
            <Button
              onClick={onCreate}
              variant="field"
              bg="violet"
              leftSection={<IconPlus size="1rem" />}
            >
              Create new entry
            </Button>
          </Group>
        )}
      </Group>

      <>{children}</>
    </Container>
  );
};
export default PageTemplate;
