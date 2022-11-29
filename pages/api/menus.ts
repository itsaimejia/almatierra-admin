import { setDoc, doc } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import { ProductProps } from "../../classes/Products"
import { db } from "../../config/firebase"
import { normilizeWord } from '../../static/onStrings';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const url = 'https://almatierra-7796b-default-rtdb.firebaseio.com/menus.json'
    const r = await fetch(url)
    let json = await r.json()
    let menus = json.filter((e: any) => e !== null)
    res.status(200).json(menus)
}

export interface MenuProps {
    id: string
    title: string
    categories: string[]
    mainImage: string,
    banner: string,
}

export const addMenuDoc = async ({ id, title, categories, mainImage, banner }: MenuProps) => {
    return await setDoc(doc(db, 'menus', id), {
        title: title,
        categorie: categories,
        mainImage: mainImage,
        banner: banner,
        status: 'active'
    })
}


// export const addAllMenus = async () => {
//     const url = 'https://almatierra-7796b-default-rtdb.firebaseio.com/menus.json'
//     const r = await fetch(url)
//     let json = await r.json()
//     let menus = json.filter((e: any) => e !== null)
//     menus.map(async (v: any) => {
//         await addMenuDoc({
//             id: normilizeWord(v.title),
//             title: v.title,
//             categories: v.categories,
//             mainImage: v.image,
//             banner: v.banner,
//         })
//     })
// }