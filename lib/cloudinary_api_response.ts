import { UploadApiResponse } from "cloudinary";

export default function isUploadApiResponse(obj: unknown): obj is UploadApiResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "secure_url" in obj &&
    typeof (obj).secure_url === "string"
  );
}