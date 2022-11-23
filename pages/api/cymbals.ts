import { getDocs, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
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

export const editProduct = async ({ id, description, name, price }: ProductProps) => {
    return await updateDoc(doc(db, 'cymbals', id), {
        name: name,
        description: description,
        price: price,
        status: 'active'
    })
}

export const turnOnOffProduct = async (id: any, status: any) => {
    const currenStatus = status === 'active' ? 'inactive' : 'active'
    return await updateDoc(doc(db, 'cymbals', id), {
        status: currenStatus
    })
}

// export const addAll = (dataCymbals: any) => {
//     dataCymbals.map((d: any, i: number) => {
//         const formatNumber = i < 10 ? '000' + i : i < 100 ? '00' + i : i < 1000 ? '0' + i : i
//         const currentId = getFirst3Letter(d.menu) + getFirstLetterEachWord(d.categorie) + formatNumber
//         console.log(currentId)
//         addProduct({
//             id: currentId,
//             menu: d.menu,
//             categorie: d.categorie,
//             description: d.description,
//             name: d.name,
//             price: d.price
//         })
//     })
// }