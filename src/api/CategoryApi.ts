import { useQuery } from "react-query";
import { useNotification } from "@/contexts/NotificationContext.tsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useGetAllCategories = () => {
  const { showNotification } = useNotification();

  const getAllCategoriesRequest = async () => {
    const response = await fetch(`${BASE_URL}/api/category/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log("searchContentRequest - response")
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to search article");
    }
    return await response.json();
  }

  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    error
  }
      = useQuery('fetchAllCategories', getAllCategoriesRequest);
  if (isError) {
    console.error(error);
    showNotification({
      horizontal: 'left',
      vertical: 'bottom',
      severity: 'error',
      message: 'Unable to fetch categories...'
    });
  }
  return { categories, isLoading, isError, isSuccess };
}

export { useGetAllCategories };
