import React, { useState } from 'react';
import UserProfileForm from "@/forms/UserProfileForm.tsx";
import { exampleUser } from "@/lib/dummyData.ts";
import { UserProfileFormZodDataType } from "@/forms/schemas/UserProfileFormSchema.ts";
import { Avatar, IconButton } from "@mui/material";
import defaultAvatar from "@/assets/default_avarta.png";
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import { sleep } from "@/utils/GlobalUtils.ts";
import { useNotification } from "@/contexts/NotificationContext.tsx";

const UserProfilePage = () => {
  // notification
  const { showNotification } = useNotification();
  const [avatarSrc, setAvatarSrc] = useState(defaultAvatar);

  const initialFormData: UserProfileFormZodDataType = {
    username: exampleUser.username,
    password: exampleUser.password!,
    description: exampleUser.description,
    email: exampleUser.email!,
    phoneNumber: exampleUser.phoneNumber!,
    role: exampleUser.role
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setAvatarSrc(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmission = async (data: UserProfileFormZodDataType) => {
    await sleep(200);
    showNotification({
      message: "Profile updated!",
      severity: "success",
      horizontal: "left",
      vertical: "bottom"
    })
  }

  return (
      <div className="w-full mx-auto pb-16 flex flex-col items-start justify-start">
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
          <div className="w-full flex flex-col justify-start items-start gap-2 relative">
            <div className="text-2xl font-bold flex items-center">
              {exampleUser.username}
              {exampleUser.role.toLowerCase() === 'admin' && (
                  <span className="ml-2 px-2 py-1 text-xs text-white bg-[#21305e] rounded-full">admin</span>
              )}
            </div>
            {/* join date */}
            <div className="text-gray-600">
              Joined QuantHub since
              <span>
              {` ${exampleUser.joinedDatetime!.getFullYear()}-${String(exampleUser.joinedDatetime!.getMonth() + 1).padStart(2, '0')}-${String(exampleUser.joinedDatetime!.getDate()).padStart(2, '0')}`}
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
