import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "iwveqhbf");
  const { data } = await axios.post("https://api.cloudinary.com/v1_1/ds6usv4r6/image/upload", formData);
  return { publicId: data?.public_id, url: data?.secure_url }
}