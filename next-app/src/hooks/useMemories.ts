import useSWR from "swr";
import { fetcher } from "util/fetcher";

export const useMemories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/memory",
    fetcher
  );
  return {
    memories: data?.memories,
    isLoading,
    error: data?.error,
    mutate,
  };
};
