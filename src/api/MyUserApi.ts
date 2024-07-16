import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "@/types.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
}

const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log("createUserRequest - accessToken", accessToken);
    const response = await fetch(`${BASE_URL}/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(user)
    });
    console.log("createUserRequest - response", response);
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  }

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest);
  return { createUser, isLoading, isError, isSuccess };
}


type UpdateProfileRequest = {
  user: User;
}
/**
 * custom hook to update user profile
 */
const useUpdateProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateProfileRequest = async (user: UpdateProfileRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
  }

  const { mutateAsync: updateProfile, isLoading, isError, isSuccess } = useMutation(updateProfileRequest);
  return { updateProfile, isLoading, isError, isSuccess };
}

export { useCreateMyUser, useUpdateProfile };
