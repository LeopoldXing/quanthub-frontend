import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useShuffleTags = () => {
  const getRandomTagsRequest = async (tagNumber: number) => {
    const response = await fetch(`${BASE_URL}/api/tag/${tagNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error("Failed to get random tags");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: shuffleTags, isLoading, isError, isSuccess } = useMutation(getRandomTagsRequest);
  return { shuffleTags, isLoading, isError, isSuccess };
}

export { useShuffleTags };
