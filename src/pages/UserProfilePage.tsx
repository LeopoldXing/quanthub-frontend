import React, { useEffect, useState } from 'react';
import UserProfileForm from "@/forms/UserProfileForm.tsx";
import { exampleUser } from "@/lib/dummyData.ts";
import { UserProfileFormZodDataType } from "@/forms/schemas/UserProfileFormSchema.ts";
import { Avatar, IconButton } from "@mui/material";
import defaultAvatar from "@/assets/default_avarta.png";
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import { useNotification } from "@/contexts/NotificationContext.tsx";
import { useGetUserProfile, useUpdateProfile } from "@/api/MyUserApi.ts";
import { uploadPicture } from "@/utils/S3BucketUtil.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/types.ts";

const UserProfilePage = () => {
  // notification
  const { showNotification } = useNotification();
  const [avatarLink, setAvatarLink] = useState("");
  const { user } = useAuth0();

  // get user profile
  const [initialProfile, setInitialProfile] = useState<User>({
    id: uuidv4(),
    username: "",
    password: "1111111111111111111",
    description: '',
    email: '',
    phoneNumber: '',
    role: 'Registered User',
    joinedDatetime: new Date()
  });
  const { getUserProfile } = useGetUserProfile();
  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile({ auth0Id: user?.sub });
    console.log("后端返回的用户信息：")
    console.log(userProfile);
    setInitialProfile({
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email,
      phoneNumber: userProfile.phone_number,
      role: userProfile.role,
      joinedDatetime: userProfile.created_at
    });
  }
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const initialFormData: UserProfileFormZodDataType = {
    username: initialProfile.username,
    password: initialProfile.password || "",
    description: initialProfile.description || "",
    email: initialProfile.email || "",
    phoneNumber: initialProfile.phoneNumber || "",
    role: initialProfile.role || "Registered User"
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          // upload avatar to aws s3
          try {
            const pictureLink = await uploadPicture({ file, onProgressUpdate: progress => console.log(progress) });
            setAvatarLink(pictureLink || "");

          } catch (error) {
            showNotification({
              horizontal: 'left',
              vertical: 'bottom',
              severity: 'error',
              message: error.message
            });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { updateProfile, isLoading: isUpdating, isError } = useUpdateProfile();
  const handleFormSubmission = async (data: UserProfileFormZodDataType) => {
    await updateProfile({ ...data, id: uuidv4(), auth0Id: user?.sub });
    showNotification({
      message: "Profile updated!",
      severity: "success",
      horizontal: "left",
      vertical: "bottom"
    });
  }

  return (
      <div className="w-full min-h-[400px] mx-auto pb-16 flex flex-col items-start justify-start">
        <div className="w-full flex justify-start items-center gap-10">
          {/* Avatar */}
          <div className="relative group">
            <Avatar src={avatarLink && avatarLink.length > 0 ? avatarLink : defaultAvatar}
                    sx={{ height: "100px", width: "100px" }}/>
            <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <IconButton component="span">
                  <LinkedCameraIcon style={{ color: 'white', fontSize: '36px' }}/>
                </IconButton>
              </label>
            </div>
          </div>
          {/* user info */}
          <div className="w-full flex flex-col justify-start items-start gap-2 relative">
            <div className="text-2xl font-bold flex items-center">
              {initialProfile.username}
              {initialProfile.role.toLowerCase() === 'admin' && (
                  <span className="ml-2 px-2 py-1 text-xs text-white bg-[#21305e] rounded-full">admin</span>
              )}
            </div>
            {/* join date */}
            <div className="text-gray-600">
              Joined QuantHub since
              <span>
              {` ${initialProfile.joinedDatetime?.getFullYear()}-${String(exampleUser.joinedDatetime!.getMonth() + 1).padStart(2, '0')}-${String(exampleUser.joinedDatetime!.getDate()).padStart(2, '0')}`}
            </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[800px] mt-10">
          <UserProfileForm initialData={initialFormData} onSubmit={handleFormSubmission}/>
        </div>
      </div>
  );
};

export default UserProfilePage;
