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

export const addImagesData = async () => {
    const url = 'https://almatierra-7796b-default-rtdb.firebaseio.com/images.json'
    const r = await fetch(url)
    let json = await r.json()
    let images = json.filter((e: any) => e !== null)
    images.map(async (m: any) => {
        const url = m.src.split('?')[0]
        const r = await fetch(url)
        let json = await r.json()
        const { md5Hash } = json
        await addImageDoc({
            id: normilizeIdmage(md5Hash),
            alt: m.alt,
            categorie: m.categorie,
            menu: m.menu,
            section: m.section,
            src: m.src
        })
    })
}