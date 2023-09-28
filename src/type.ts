export interface SearchParamType {
    [x: string]: string | number
}

export default interface DataType {
    [x: string]: string | number | SearchParamType | string[]
    id: number,
    // name: string,
    // username: string,
    // email: string,
    // address: {
    //     [x: string]: string
    //     street: string,
    //     suite: string,
    //     city: string,
    // },
    // phone: string,
    // website: string,
    // company: {
    //     [x: string]: string
    //     name: string,
    //     industry: string
    // },
    // gender: "Male" | "Female",
    // age: number
}

export type ColItemType = BasicColItemType | SearchColItemType | SliderColItemType | MultitagColItemType

interface BasicColItemType {
    field: string
    label: string
    group?: string
}

interface SearchColItemType extends BasicColItemType {
    type: 'search'
}

export interface SliderColItemType extends BasicColItemType {
    type: 'slider'
    min: number
    max: number
    marks: { value: number, label: string }[]
}

export interface MultitagColItemType extends BasicColItemType {
    type: 'multitag'
    tags: string[]
}

export interface ColumnGroupType {
    label: string
    colSpan: number
}