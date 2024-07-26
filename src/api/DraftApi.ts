import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type SaveDraftRequestProps = {
  id?: string;
  authorId: string;
  title?: string;
  subTitle?: string;
  type: "article" | 'announcement';
  isDraft: boolean;
  contentHtml: string;
  contentText: string;
  coverImageLink?: string;
  category?: string;
  tags?: string[];
  attachmentLink?: string;
  attachmentName?: string;
  referenceId?: string;
}
const useSaveDraft = () => {
  const { getAccessTokenSilently } = useAuth0();

  const saveDraftRequest = async (data: SaveDraftRequestProps) => {
    data = { ...data, isDraft: true };
    const accessToken = await getAccessTokenSilently();
    console.log("正在保存草稿")
    console.log(data);
    const response = await fetch(`${BASE_URL}/api/draft/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to save draft");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: saveDraft, isLoading, isError, isSuccess } = useMutation(saveDraftRequest);
  return { saveDraft, isLoading, isError, isSuccess };
}

const useGetArticleDraft = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getArticleDraftRequest = async (articleId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/api/draft/article/${articleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to get draft");
    } else {
      const res = await response.json();
      console.log("获取的草稿:")
      console.log(res)
      return res;
    }
  }

  const { mutateAsync: getDraftByArticleId, isLoading, isError, isSuccess } = useMutation(getArticleDraftRequest);
  return { getDraftByArticleId, isLoading, isError, isSuccess };
}

const useGetDraft = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getDraftRequest = async (draftId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/api/draft/get/${draftId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to get draft");
    } else {
      const res = await response.json();
      console.log("获取的草稿:")
      console.log(res)
      return res;
    }
  }

  const { mutateAsync: getDraftById, isLoading, isError, isSuccess } = useMutation(getDraftRequest);
  return { getDraftById, isLoading, isError, isSuccess };
}

const useDeleteDraft = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteDraftRequest = async (draftId: string) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${BASE_URL}/api/draft/delete/${draftId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete draft");
    }
  }

  const { mutateAsync: deleteDraftById, isLoading, isError, isSuccess } = useMutation(deleteDraftRequest);
  return { deleteDraftById, isLoading, isError, isSuccess };
}

export { useSaveDraft, useGetArticleDraft, useGetDraft, useDeleteDraft };
