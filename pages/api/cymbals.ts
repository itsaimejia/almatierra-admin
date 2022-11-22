import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../config/firebase";

interface ProductProps {
    id: string
    menu: string
    categorie: string
    name: string
    description: string
    price: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const querySnapshot = await getDocs(collection(db, "cymbals"))
    let cymbals: any = []
    querySnapshot.forEach((doc) => {
        const newObject = {
            id: doc.id,
            menu: doc.data().menu,
            categorie: doc.data().categorie,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            status: doc.data().status
        }
        cymbals.push(newObject)
    })

    let sortCymbals = cymbals.sort((a: any, b: any) => parseInt(b.id.slice(-4)) - parseInt(a.id.slice(-4)))
    res.status(200).json(sortCymbals)
}


export const addProduct = async ({ id, menu, categorie, description, name, price }: ProductProps) => {
    return await setDoc(doc(db, 'cymbals', id), {
        menu: menu,
        categorie: categorie,
        name: name,
        description: description,
        price: price,
        status: 'active'
    })
}
