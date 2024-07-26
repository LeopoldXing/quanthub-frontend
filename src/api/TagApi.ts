import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useNotification } from "@/contexts/NotificationContext.tsx";
import Cookies from "js-cookie";

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
  const { showNotification } = useNotification();

  const getMyTagsRequest = async (tagNumber: number) => {
    const cookie = Cookies.get("quanthub-user");
    let parsedCookie = null;
    if (cookie) {
      parsedCookie = JSON.parse(cookie);
    }

    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/my/tags/${tagNumber}/${parsedCookie?.user.id}`, {
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
    }
  }

  const { mutateAsync: getMyTags, isLoading, isError, isSuccess, error } = useMutation(getMyTagsRequest);

  if (error) {
    showNotification({
      horizontal: 'left',
      vertical: 'bottom',
      severity: 'error',
      message: 'Unable to fetch tags, please try again'
    });
  }

  return { getMyTags, isLoading, isError, isSuccess };
}

export { useShuffleTags, useGetMyTags };
