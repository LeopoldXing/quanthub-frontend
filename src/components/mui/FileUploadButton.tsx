import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from "react";
import { Input } from "@mui/material";

type FileUploadButtonProps = {
  onUpload?: (file: File) => void;
}

export default function FileUploadButton({ onUpload }: FileUploadButtonProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (onUpload) {
        onUpload(file);
      }
    }
  };

  return (
      <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon/>}
      >
        Upload file
        <Input sx={{ display: 'none' }} type="file" onChange={handleFileChange}/>
      </Button>
  );
}
