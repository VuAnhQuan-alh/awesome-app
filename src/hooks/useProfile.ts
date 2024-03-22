import { useMutation, useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@zone/libs/supabase";
import { ISignIn } from "@zone/types/type";

const fetchUser = async () => {
  const { data: user, error } = await supabaseClient.auth.getUser();
  return user;
};
const fetchSignIn = async ({ email, password }: ISignIn) => {
  const { data: profile, error } = await supabaseClient.auth.signInWithPassword(
    { email, password }
  );
  return profile;
};

const useProfile = () => {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchUser,
  });
  return query;
};
const useSignIn = ({ email, password }: ISignIn) => {
  const mutation = useMutation({
    mutationFn: () => fetchSignIn({ email, password }),
  });
  return mutation;
};

export { useProfile, useSignIn };
