const removeSpaces = (str: string) => str.replace(/\s/g, '')
export const normilizeWord = (str: string) => removeSpaces(str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase())

export const isNotEmpty = (str: string) => !(str === '')

export const getFirst3Letter = (str: string) => str.substring(0, 3).toUpperCase()

export const getFirstLetterEachWord = (str: string) => str.split(" ").map((word) => word[0].toUpperCase()).join('')

export const normilizeIdmage = (str: string) => str.replace(/[^A-Za-z0-9]/g, '')