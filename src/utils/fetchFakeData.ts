import DataType, { SearchParamType } from "../type";
import data from '../fakeData.json'

const DATA = data as DataType[]
export default async function fetchFakeDate(searchParam: SearchParamType): Promise<DataType[]> {
    const searchParamArr = Object.entries(searchParam)
    const filteredData = searchParamArr.length === 0 ? DATA : DATA.filter(item => searchParamArr.every(param => {
        const currData = item[param[0]]
        if (typeof currData !== "string" || typeof param[1] !== "string") return false
        if (currData.toLowerCase().includes(param[1].toLowerCase())) return true
    }))
    const response = await new Promise<DataType[]>((resolve) =>
        setTimeout(() => resolve(filteredData), 500)
    )
    return response
}