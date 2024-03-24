import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@zone/libs/supabase";
import { ISignIn } from "@zone/types/type";

const fetchUser = async () => {
  const { data, error } = await supabaseClient.auth.getUser();
  return data;
};
const fetchSignIn = async (value: ISignIn) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword(value);

  if (error?.message) {
    notifications.show({
      message: error.message,
      color: "red",
    });
  }

  return data;
};
const fetchSignUp = async (value: ISignIn) => {
  const { data, error } = await supabaseClient.auth.signUp(value);
  if (error?.message) {
    notifications.show({
      message: error.message,
      color: "red",
    });
  }
  return data;
};
const fetchSignOut = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error?.message) {
    notifications.show({
      message: error.message,
      color: "red",
    });
  }
};

const useProfile = () => {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchUser,
  });
  return query;
};
const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: fetchSignIn,
  });
  return mutation;
};
const useSignUp = () => {
  return useMutation({ mutationFn: fetchSignUp });
};
const useSignOut = () => {
  return useMutation({ mutationFn: fetchSignOut });
};

export { useProfile, useSignIn, useSignUp, useSignOut };
