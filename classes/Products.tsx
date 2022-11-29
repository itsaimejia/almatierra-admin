import { keys } from '@mantine/utils';
export interface ProductProps {
    id: string
    menu: string
    categorie: string
    name: string
    description: string
    price: string
}

export function filterData(data: ProductProps[], search: string) {
    const query = search.toLowerCase().trim()
    return data.filter((item) => keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query)));
}

export function sortData(data: ProductProps[], payload: { search: string }) {
    return filterData(
        [...data],
        payload.search
    )
}