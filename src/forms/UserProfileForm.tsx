import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileFormSchema, UserProfileFormZodDataType } from "@/forms/schemas/UserProfileFormSchema.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';

type UserProfileFormProps = {
  initialData: UserProfileFormZodDataType;
  onSubmit?: (formData: UserProfileFormZodDataType) => Promise<void>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialData, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<UserProfileFormZodDataType>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      username: initialData.username,
      password: initialData.password || "",
      description: initialData.description || "",
      email: initialData.email || "",
      phoneNumber: initialData.phoneNumber || "",
      role: initialData.role || "Registered User"
    }
  });

  const [loading, setLoading] = useState(false);
  const handleFormSubmission = async (data: UserProfileFormZodDataType) => {
    try {
      setLoading(true);
      onSubmit && await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box component="form" onSubmit={handleSubmit(handleFormSubmission)} noValidate sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        gap: 5
      }}>
        <div className="w-full md:flex justify-between items-center gap-5">
          <Controller
              name="username"
              control={control}
              render={({ field }) => (
                  <TextField
                      {...field}
                      label="Username"
                      fullWidth
                      margin="none"
                      variant="outlined"
                      error={!!errors.username}
                      helperText={errors.username ? errors.username.message : ''}
                  />
              )}
          />
          <Controller
              name="password"
              control={control}
              render={({ field }) => (
                  <div className="w-full mt-10 md:mt-0">
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                  </div>
              )}
          />
        </div>
        <Controller
            name="email"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    disabled
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                />
            )}
        />
        <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label="Phone Number (Optional)"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                />
            )}
        />
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label="Description (Optional)"
                    placeholder="Introduce yourself to other traders!"
                    fullWidth
                    multiline
                    rows={12}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                />
            )}
        />
        <Controller
            name={"role"}
            control={control}
            render={({ field }) => (
                <div className="hidden">
                  <TextField
                      {...field}
                  />
                </div>
            )}
        />
        <div className="w-full flex justify-end items-center">
          <LoadingButton type="submit" variant="contained" color="primary" loadingPosition="end"
                         loading={loading} endIcon={<SaveIcon fontSize="small"/>}>
            Save
          </LoadingButton>
        </div>
      </Box>
  );
};

export default UserProfileForm;
