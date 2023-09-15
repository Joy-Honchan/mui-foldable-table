export default interface DataType {
    [x: string]: string | number | DataType['address'] | DataType['company']
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        [x: string]: string
        street: string,
        suite: string,
        city: string,
    },
    phone: string,
    website: string,
    company: {
        [x: string]: string
        name: string,
        industry: string
    },
    gender: "Male" | "Female",
    age: number
}

export interface ColItemType {
    field: string
    label: string
    group?: string
}

export interface ColumnGroupType {
    label: string
    colSpan: number
}