import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { sleep } from "@/utils/GlobalUtils.ts";
import { tags } from "@/lib/dummyData.ts";

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

const useGetMyTags = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyTagsRequest = async (tagNumber: number) => {
    /*const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/my/tags/${tagNumber}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to get my tags");
    } else {
      return await response.json();
    }*/
    await sleep(1000);
    return tags.map(tag => tag.name);
  }

  const { mutateAsync: getMyTags, isLoading, isError, isSuccess } = useMutation(getMyTagsRequest);
  return { getMyTags, isLoading, isError, isSuccess };
}

export { useShuffleTags, useGetMyTags };
