import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type SearchContentRequestProps = {
  keyword: string;
  categoryList: string[];
  tagList: string[];
  sortStrategy: "publish_date" | "update_date" | "recommended";
  sortDirection: "desc" | "asc" | "none";
  type?: "article" | "announcement" | "draft";
}
const useSearchContent = () => {
  const searchContentRequest = async (data: SearchContentRequestProps) => {
    const queryParams = new URLSearchParams(data as any).toString();
    console.log("search - params");
    console.log(data);
    console.log("search - url");
    console.log(`${BASE_URL}/api/article/search?${queryParams}`)
    const response = await fetch(`${BASE_URL}/api/article/search?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("searchContentRequest - response")
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to search article");
    } else {
      console.log("searchContentRequest - res")
      const res = await response.json();
      console.log(res);
      return res;
    }
  }

  const { mutateAsync: searchContent, isLoading, isError, isSuccess } = useMutation(searchContentRequest);
  return { searchContent, isLoading, isError, isSuccess };
}

type CreateArticleRequestParam = {
  authorId: string;
  title: string;
  subTitle?: string;
  contentHtml: string;
  contentText: string;
  coverImageLink?: string;
  category?: string;
  tags?: string[];
  attachmentLink?: string;
  attachmentName?: string;
  type: "article" | "announcement" | "draft";
  referenceId?: string;
  draftId?: string;
  isAnnouncement?: boolean;
}
const useCreateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createArticleRequest = async (data: CreateArticleRequestParam) => {
    const accessToken = await getAccessTokenSilently();
    data = { ...data, type: "article" };

    console.log("发布文章");
    console.log(data);
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
  attachmentName?: string;
  type: "article" | "announcement" | "draft";
  draftId?: string;
  isAnnouncement?: boolean;
}
const useUpdateArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateArticleRequest = async (data: UpdateArticleRequestProps) => {
    const accessToken = await getAccessTokenSilently();
    console.log("发送更新文章请求：")
    console.log({
      ...data,
      content: ""
    });
    const response = await fetch(`${BASE_URL}/api/article/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        ...data,
        content: ""
      })
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
      return await response.json();
    }
  }

  const { mutateAsync: getArticle, isLoading, isError, isSuccess } = useMutation(getArticleRequest);
  return { getArticle, isLoading, isError, isSuccess };
}

const useDeleteArticle = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteArticleRequest = async (articleId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/article/${articleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete article");
    }
  }

  const { mutateAsync: deleteArticle, isLoading, isError, isSuccess } = useMutation(deleteArticleRequest);
  return { deleteArticle, isLoading, isError, isSuccess };
}

export { useCreateArticle, useUpdateArticle, useGetArticle, useSearchContent, useDeleteArticle }
