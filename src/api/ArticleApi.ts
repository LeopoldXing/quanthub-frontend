import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type CreateArticleRequestProps = {
  authorId: string;
  title: string;
  subTitle?: string;
  contentHtml: string;
  contentText?: string;
  coverImageLink?: string;
  category?: string;
  tags?: string[];
  attachmentLink?: string;
}
const useCreateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createArticleRequest = async (data: CreateArticleRequestProps) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/article/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to create article");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: publishArticle, isLoading, isError, isSuccess } = useMutation(createArticleRequest);
  return { publishArticle, isLoading, isError, isSuccess };
}


type UpdateArticleRequestProps = {
  articleId: string;
  authorId: string;
  title: string;
  subTitle?: string;
  contentHtml: string;
  contentText?: string;
  coverImageLink?: string;
  category?: string;
  tags?: string[];
  attachmentLink?: string;
}
const useUpdateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateArticleRequest = async (data: UpdateArticleRequestProps) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/article/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to update article");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: updateArticle, isLoading, isError, isSuccess } = useMutation(updateArticleRequest);
  return { updateArticle, isLoading, isError, isSuccess };
}

const useGetArticle = () => {
  const getArticleRequest = async (articleId: string) => {
    const response = await fetch(`${BASE_URL}/api/article/${articleId}`, {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error("Failed to get article");
    } else {
      const responsedata = await response.json();
      console.log("responsedata -> ")
      console.log(responsedata);
      return responsedata;
    }
  }

  const { mutateAsync: getArticle, isLoading, isError, isSuccess } = useMutation(getArticleRequest);
  return { getArticle, isLoading, isError, isSuccess };
}

export { useCreateArticle, useUpdateArticle, useGetArticle }
