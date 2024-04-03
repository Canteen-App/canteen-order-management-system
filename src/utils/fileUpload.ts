import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CategoryType } from "../types/index";
import { storage } from "@/config/firebase";

export const uploadFile = async (
  file: File,
  id: string,
  target: CategoryType
) => {
  const fileRef = ref(storage, `images/${target}/${id}`);
  await uploadBytes(fileRef, file).then(() => {
    alert("Uploaded successfully");
  });
  console.log(fileRef);
  const fileUrl = await getDownloadURL(fileRef);
  return fileUrl;
};
