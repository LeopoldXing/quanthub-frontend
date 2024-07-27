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
    const response = await fetch(`${BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(user)
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  }

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest);
  return { createUser, isLoading, isError, isSuccess };
}


/**
 * custom hook to update user profile
 */
const useUpdateProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateProfileRequest = async (user: User) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/profile`, {
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


type GetUserProfileRequest = {
  id?: string;
  auth0Id?: string;
  email?: string;
}
const useGetUserProfile = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserProfileRequest = async (data: GetUserProfileRequest) => {
    const accessToken = await getAccessTokenSilently();
    const queryParams = new URLSearchParams(data as never).toString();
    const response = await fetch(`${BASE_URL}/api/profile?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to get profile");
    } else {
      const res = await response.json();
      console.log("获取用户信息：")
      console.log(res);
      return res;
    }
  }

  const { mutateAsync: getUserProfile, isLoading, isError, isSuccess } = useMutation(getUserProfileRequest);
  return { getUserProfile, isLoading, isError, isSuccess };
}

type UpdateAvatarRequest = {
  id?: string;
  auth0Id?: string;
  avatarLink: string;
}
const updateAvatarLink = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateAvatarRequest = async (data: UpdateAvatarRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${BASE_URL}/api/avatar`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Failed to update avatar");
    }
  }

  const { mutateAsync: updateAvatar, isLoading, isError, isSuccess } = useMutation(updateAvatarRequest);
  return { updateAvatar, isLoading, isError, isSuccess };
}

export { useCreateMyUser, useUpdateProfile, useGetUserProfile, updateAvatarLink };
