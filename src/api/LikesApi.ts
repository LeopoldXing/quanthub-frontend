import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type LikeArticleRequestParams = {
  articleId: string;
  type: boolean;
}
const useLikingService = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const likeArticleRequest = async (data: LikeArticleRequestParams) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        'article_id': data.articleId,
        'auth0_id': user!.sub,
        'type': data.type
      })
    });
    if (!response.ok) {
      throw new Error("Failed to like article");
    }
  }

  const { mutateAsync: likeThisArticle, isLoading, isError, isSuccess } = useMutation(likeArticleRequest);
  return { likeThisArticle, isLoading, isError, isSuccess };
}

const useCancelLikingService = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const CancelLikingArticleRequest = async (articleId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        'article_id': articleId,
        'auth0_id': user!.sub,
      })
    });
    if (!response.ok) {
      throw new Error("Failed to cancel like this article");
    }
  }

  const {
    mutateAsync: cancelLikingThisArticle,
    isLoading,
    isError,
    isSuccess
  } = useMutation(CancelLikingArticleRequest);
  return { cancelLikingThisArticle, isLoading, isError, isSuccess };
}

export { useCancelLikingService, useLikingService }
