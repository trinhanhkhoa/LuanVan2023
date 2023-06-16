import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "iwveqhbf");
  const { data } = await axios.post(`${process.env.REACT_APP_API_CLOUDINARY}`, formData);
  return { publicId: data?.public_id, url: data?.secure_url }
}