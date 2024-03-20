import Link from "next/link";
import { ReactNode } from "react";

import { Button, Container, Group, rem, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type IProps = {
  children: ReactNode;
  title: string;
  urlAction: string;
};

const PageTemplate = (props: IProps) => {
  const { children, urlAction } = props;

  return (
    <Container h={rem(70)} py="md">
      <Group justify="space-between" align="center" mb="md">
        <Title order={2} tt="capitalize">
          Title
        </Title>

        <Group>
          <Button
            variant="field"
            component={Link}
            bg="violet"
            leftSection={<IconPlus size="1rem" />}
            href={urlAction}
          >
            Create new entry
          </Button>
        </Group>
      </Group>

      <>{children}</>
    </Container>
  );
};
export default PageTemplate;
