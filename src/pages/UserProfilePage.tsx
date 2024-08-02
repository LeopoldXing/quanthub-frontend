import React, { useEffect, useState } from 'react';
import UserProfileForm from "@/forms/UserProfileForm.tsx";
import { UserProfileFormZodDataType } from "@/forms/schemas/UserProfileFormSchema.ts";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import defaultAvatar from "@/assets/default_avarta.png";
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import { useNotification } from "@/contexts/NotificationContext.tsx";
import { useGetUserProfile, useUpdateProfile } from "@/api/MyUserApi.ts";
import { v4 as uuidv4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfilePage = () => {
  const { user } = useAuth0();

  // notification
  const { showNotification } = useNotification();

  // get user profile
  const { getUserProfile, isLoading: isFetchingProfile } = useGetUserProfile();
  const [userProfile, setUserProfile] = useState();
  const fetchUserProfileData = async () => {
    try {
      const response = await getUserProfile({ auth0Id: user?.sub });
      setUserProfile(response);
    } catch (error) {
      showNotification({
        message: "Failed to fetch user profile.",
        severity: "error",
        horizontal: "left",
        vertical: "bottom"
      });
    }
  }
  useEffect(() => {
    if (user) {
      fetchUserProfileData();
    }
  }, [user]);

  /*  handle user avatar change  */
  /*const { updateAvatar } = useUpdateAvatarLink();*/
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatar);
  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result) {
          // upload avatar to aws s3
          try {
            /*const pictureLink = await uploadPicture({ file, onProgressUpdate: progress => console.log(progress) });
            setAvatarLink(pictureLink || "");
            await updateAvatar({ auth0Id: user?.sub, avatarLink: pictureLink });*/
            setAvatarSrc(reader.result as string);
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

  /*  update profile  */
  const { updateProfile } = useUpdateProfile();
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
            <Avatar src={avatarSrc} sx={{ height: "100px", width: "100px" }}/>
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
          {!isFetchingProfile ? (
              <div className="w-full flex flex-col justify-start items-start gap-2 relative">
                <div className="text-2xl font-bold flex items-center">
                  {userProfile?.username}
                  {userProfile?.role.toLowerCase() === 'admin' && (
                      <span className="ml-2 px-2 py-1 text-xs text-white bg-[#21305e] rounded-full">admin</span>
                  )}
                </div>
                {/* join date */}
                <div className="text-gray-600">
                  Joined QuantHub since<span>{` ${userProfile?.joinedDatetime}`}</span>
                </div>
              </div>
          ) : (
              <div className="w-full flex flex-col justify-start items-start gap-2 relative">
                <div className="text-2xl font-bold flex items-center">
                  <Skeleton variant="text" width={200} height={40}/>
                </div>
                {/* join date */}
                <div className="text-gray-600">
                  <Skeleton variant="text" width={400} height={20}/>
                </div>
              </div>
          )}
        </div>
        <div className="w-full max-w-[800px] mt-10">
          {!isFetchingProfile && (
              <UserProfileForm onSubmit={handleFormSubmission} initialData={{
                username: userProfile?.username,
                description: userProfile?.description,
                email: userProfile?.email,
                phoneNumber: userProfile?.phoneNumber,
                role: userProfile?.role
              }}/>
          )}
        </div>
      </div>
  );
};

export default UserProfilePage;
