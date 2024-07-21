import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticleComment } from "@/types.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export type leaveCommentRequestParams = {
  content: string,
  articleId: string,
}
const useLeaveComment = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const leaveCommentRequest = async (data: leaveCommentRequestParams) => {
    const accessToken = getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ ...data, operatorId: user!.sub! })
    });
    if (!response.ok) {
      throw new Error("Failed to create comment");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: leaveComment, isLoading, isError, isSuccess } = useMutation(leaveCommentRequest);
  return { addComment: leaveComment, isLoading, isError, isSuccess };
}


const useGetArticlesComments = () => {
  const getArticlesCommentsRequest = async (articleId: string) => {
    const response = await fetch(`${BASE_URL}/api/comment/get/${articleId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to create comment");
    } else {
      return await response.json();
    }
  }

  const { mutateAsync: getArticleComments, isLoading, isError, isSuccess } = useMutation(getArticlesCommentsRequest);
  return { getArticleComments, isLoading, isError, isSuccess };
}


const useDeleteComment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const deleteCommentRequest = async (id: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/comment/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.ok;
  }

  const { mutateAsync: deleteComment, isLoading, isError, isSuccess } = useMutation(deleteCommentRequest);
  return { deleteComment, isLoading, isError, isSuccess };
}


const useUpdateComment = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const updateCommentRequest = async (data: ArticleComment) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/comment/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        id: data.id,
        content: data.content,
        operatorId: user!.sub!
      })
    });
    if (response.ok) {
      return await response.json();
    }
  }

  const { mutateAsync: updateComment, isLoading, isError, isSuccess } = useMutation(updateCommentRequest);
  return { updateComment, isLoading, isError, isSuccess };
}

export { useLeaveComment, useGetArticlesComments, useDeleteComment, useUpdateComment };
