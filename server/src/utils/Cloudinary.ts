import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Type definition for file paths
const getResourceType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  if (
    [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"].includes(ext)
  ) {
    return "image";
  } else if ([".mp4", ".avi", ".mov", ".mkv", ".webm", ".flv"].includes(ext)) {
    return "video";
  }
  return "auto";
};

// Upload function with type for response
interface CloudinaryUploadResponse {
  url: string;
  public_id: string;
  // Add other properties based on Cloudinary response structure
}

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<CloudinaryUploadResponse | null> => {
  try {
    if (!localFilePath) return null;

    const resourceType:any = getResourceType(localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
      chunk_size: resourceType === "video" ? 6000000 : undefined,
    });

    if (response && response.url) {
      console.log(
        `File uploaded successfully as ${resourceType}:`,
        response.url
      );
      return response as CloudinaryUploadResponse;
    } else {
      throw new Error("Cloudinary upload response is invalid");
    }
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error.message);
    return null;
  } finally {
    try {
      fs.unlinkSync(localFilePath);
    } catch (cleanupError: any) {
      console.error("Error deleting local file:", cleanupError.message);
    }
  }
};

export { uploadOnCloudinary };
