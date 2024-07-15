import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { ArticleSearchParamType, CompleteArticleData } from "@/types.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useCreateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createArticleRequest = async (data: ArticleSearchParamType) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to create article");
    }
  }

  const { mutateAsync: createArticle, isLoading, isError, isSuccess } = useMutation(createArticleRequest);
  return { createArticle, isLoading, isError, isSuccess };
}


type UpdateArticleRequestProps = {
  auth0Id: string;
  authorId: string;
  articleData: CompleteArticleData;
}
const useUpdateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateArticleRequest = async (data: UpdateArticleRequestProps) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/article`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to update article");
    }
  }

  const { mutateAsync: updateArticle, isLoading, isError, isSuccess } = useMutation(updateArticleRequest);
  return { updateArticle, isLoading, isError, isSuccess };
}

export { useCreateArticle, useUpdateArticle }
