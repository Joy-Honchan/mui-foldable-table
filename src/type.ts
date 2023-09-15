export default interface DataType {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
    },
    phone: string,
    website: string,
    company: {
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