import DataType, { SearchParamType } from "../type";
import data from '../fakeData.json'

const DATA = data as DataType[]
export default async function fetchFakeDate(searchParam: SearchParamType): Promise<DataType[]> {
    const searchParamArr = Object.entries(searchParam)
    const filteredData = searchParamArr.length === 0 ? DATA : DATA.filter(item => searchParamArr.every(([key, value]) => filterFunc(key, value, item)))
    const response = await new Promise<DataType[]>((resolve) =>
        setTimeout(() => resolve(filteredData), 500)
    )
    return response
}

const filterFunc = (field: string, keyword: string | number, originData: DataType) => {

    const currData = originData[field]
    if (typeof currData === "string" && typeof keyword === "string") {
        if (keyword === "") return true
        if (currData.toLowerCase().includes(keyword.toLowerCase())) return true
        return false
    }
    if (typeof currData === "number" && typeof keyword === "number") {
        if (keyword === 0) return true
        if (currData <= keyword && currData > keyword - 5) return true
        return false
    }
    if (Array.isArray(currData) && typeof keyword === "string") {
        if (keyword === "") return true
        const personalityArr = keyword.split(',');
        if (personalityArr.every(item => currData.includes(item))) return true
    }
    return false
}