import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@zone/libs/supabase";

const fetchHero = async () => {
  const { data, error } = await supabaseClient().from("hero").select("*");
  if (error) throw new Error(error.message);

  return data;
};

const useFetchHero = () => {
  return useQuery({
    queryKey: ["heros"],
    queryFn: fetchHero,
    enabled: false,
  });
};

export { useFetchHero };
