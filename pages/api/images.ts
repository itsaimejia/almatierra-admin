import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { normilizeIdmage } from "../../static/onStrings";


export const uploadImage = async (file: any) => {
    const storageRef = ref(storage, file.name)
    return await uploadBytes(storageRef, file)
}

interface ImageDocProps {
    id: string
    alt: string,
    categorie: string
    menu: string
    section: string
    src: string
}
export const addImageDoc = async ({ id, alt, categorie, menu, section, src }: ImageDocProps) => {
    return await setDoc(doc(db, 'images', id), {
        alt: alt,
        menu: menu,
        categorie: categorie,
        section: section,
        src: src
    })

}

