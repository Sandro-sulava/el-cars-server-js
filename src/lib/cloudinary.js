const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image safely to Cloudinary
 * @param {string} image - Base64, URL, or local path
 * @returns {Promise<string>} - Uploaded image URL or original URL for remote
 */
async function safeUpload(image) {
  if (!image) {
    console.warn("safeUpload: No image provided");
    return null;
  }

  try {
    // Case 1: Base64 / data URI
    if (image.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "electric_cars",
      });
      return uploadResponse.secure_url;
    }

    // Case 2: Remote URL (HTTP/S)
    if (image.startsWith("http://") || image.startsWith("https://")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "electric_cars",
          type: "fetch",
        });
        return uploadResponse.secure_url;
      } catch (err) {
        console.warn(
          `safeUpload: Cloudinary fetch failed for URL "${image}". Using original URL instead.`
        );
        return image; // fallback to original URL
      }
    }

    // Case 3: Local file path
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "electric_cars",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("safeUpload: Upload failed:", error.message);
    return image; // fallback to original input
  }
}

module.exports = { cloudinary, safeUpload };
