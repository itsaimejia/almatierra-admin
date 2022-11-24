import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

interface ImageProps {
    file: any

}
export const uploadImage = async ({ file }: ImageProps) => {
    const storageRef = ref(storage, 'some-child');
    return uploadBytes(storageRef, file)
}