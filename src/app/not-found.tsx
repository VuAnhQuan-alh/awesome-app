import { Box, Container } from "@mantine/core";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <Container>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: 140 }}
      >
        <Image src="/not-found.png" alt="not-found" width={640} height={360} />
      </Box>
    </Container>
  );
}
