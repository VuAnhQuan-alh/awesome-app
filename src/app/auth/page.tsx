"use client";

import Link from "next/link";
import { z } from "zod";

import {
  Box,
  Button,
  Container,
  Divider,
  PasswordInput,
  rem,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconBrandDiscord,
  IconBrandGoogleHome,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { IconThink } from "@zone/components/icons";
import { useSignIn } from "@zone/hooks/useProfile";
import { ISignIn } from "@zone/types/type";

const AuthPage = () => {
  const { mutate } = useSignIn();

  const { Field, Subscribe, handleSubmit } = useForm<ISignIn>({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      mutate(value);
      console.log("sign-in", { value });
    },
  });

  return (
    <Container>
      <Box pos="relative" mt="18%" style={{ textAlign: "center" }}>
        <Box
          component={Link}
          href="/auth/register"
          pos="absolute"
          top={rem(-74)}
          right="30%"
        >
          <IconThink />
        </Box>
        <Title order={4}>Sign In With Awesome</Title>
      </Box>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void handleSubmit();
        }}
      >
        <Stack mx="auto" w={rem(360)}>
          <Field
            name="email"
            validatorAdapter={zodValidator}
            validators={{
              onChange: z.string().email(),
            }}
          >
            {(field) => {
              return (
                <TextInput
                  name={field.name}
                  value={field.state.value}
                  label="Email"
                  error={field.getMeta().errorMap.onChange}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              );
            }}
          </Field>

          <Field
            name="password"
            validatorAdapter={zodValidator}
            validators={{
              onChange: z
                .string()
                .min(8, { message: "Password must be at least 8 characters." }),
            }}
          >
            {(field) => (
              <>
                <PasswordInput
                  name={field.name}
                  value={field.state.value}
                  label="Password"
                  error={field.getMeta().errorMap.onChange}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          </Field>

          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button w="100%" type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submitting"}
              </Button>
            )}
          </Subscribe>
        </Stack>
      </form>

      <Stack mt="xl" mx="auto" w={rem(360)}>
        <Divider label="Single Sign On" labelPosition="center" />
        <Button
          variant="light"
          color="red"
          leftSection={<IconBrandGoogleHome size="1rem" />}
        >
          Sign in with Google
        </Button>

        <Button
          variant="light"
          color="blue"
          leftSection={<IconBrandTwitter size="1rem" />}
        >
          Sign in with Twitter
        </Button>

        <Button
          variant="light"
          color="violet"
          leftSection={<IconBrandDiscord size="1rem" />}
        >
          Sign in with Discord
        </Button>
      </Stack>
    </Container>
  );
};
export default AuthPage;
