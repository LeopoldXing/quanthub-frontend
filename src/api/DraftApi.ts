import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type SaveDraftRequestProps = {
  authorId: string;
  title: string;
  subTitle?: string;
  contentHtml: string;
  contentText?: string;
  coverImageLink?: string;
  category?: string;
  tags?: string[];
  attachmentLink?: string;
  type: "draft";
}
const useSaveDraft = () => {
  const { getAccessTokenSilently } = useAuth0();

  const saveDraftRequest = async (data: SaveDraftRequestProps) => {
    data = { ...data, type: "draft" };
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/article/draft`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to save draft");
    }
  }

  const { mutateAsync: saveDraft, isLoading, isError, isSuccess } = useMutation(saveDraftRequest);
  return { saveDraft, isLoading, isError, isSuccess };
}

export { useSaveDraft };
