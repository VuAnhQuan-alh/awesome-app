import { Container, Grid, GridCol, Skeleton } from "@mantine/core";

export default function Home() {
  const child = <Skeleton height={140} radius="md" />;
  return (
    <Container>
      <Grid>
        <GridCol span={{ base: 12, xs: 4 }}>{child}</GridCol>
        <GridCol span={{ base: 12, xs: 8 }}>{child}</GridCol>
        <GridCol span={{ base: 12, xs: 8 }}>{child}</GridCol>
        <GridCol span={{ base: 12, xs: 4 }}>{child}</GridCol>
        <GridCol span={{ base: 12, xs: 3 }}>{child}</GridCol>
        <GridCol span={{ base: 12, xs: 3 }}>{child}</GridCol>
        <GridCol span={{ base: 12, xs: 6 }}>{child}</GridCol>
      </Grid>
    </Container>
  );
}
