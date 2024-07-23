import AWS from 'aws-sdk';
import { calculateMD5 } from "@/utils/GlobalUtils.ts";
import { v4 as uuidv4 } from "uuid";

const accessKeyId = import.meta.env.VITE_AWS_ACCESSKEY_ID as string;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESSKEY as string;
const s3BucketName = import.meta.env.VITE_S3_BUCKET_NAME as string;
const s3Region = import.meta.env.VITE_S3_REGION as string;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

const myBucket = new AWS.S3({
  params: { Bucket: s3BucketName },
  region: s3Region,
});

type UploadFileProps = {
  file: File;
  onProgressUpdate: (progress: number) => void;
};

const uploadFile = async ({ file, onProgressUpdate }: UploadFileProps) => {
  if (!(file instanceof File)) {
    console.error('The provided value is not a File.');
    return;
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('en-US', { month: 'short' });
  const day = currentDate.getDate();

  const uuid = uuidv4();
  const newFileName = `${uuid}${file.name.substring(file.name.lastIndexOf('.'))}`;
  const keyPath = `files/${year}/${month}/${day}/${newFileName}`;

  try {
    const md5Base64 = await calculateMD5(file);
    const params = {
      Body: file,
      Bucket: s3BucketName,
      Key: keyPath,
      ContentMD5: md5Base64
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          onProgressUpdate(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);
        });

    return `https://${s3BucketName}.s3.${s3Region}.amazonaws.com/${keyPath}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    return ``;
  }
};

const deleteFile = async (path: string): Promise<void> => {
  if (!path || path === '') {
    return;
  }
  const key = new URL(path).pathname.substring(1);
  try {
    const deleteParams = {
      Bucket: s3BucketName,
      Key: key
    };
    myBucket.deleteObject(deleteParams, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        if (data.DeleteMarker) {
          console.log("Delete marker set:", data.DeleteMarker);
        }
      }
    });
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

export { uploadFile, deleteFile };
