import DataType from "../type"

export default function displayData(colName: string, rowData: Partial<DataType>) {

    const fieldArr = colName.split('.')

    let fieldData = rowData[fieldArr[0]]
    if (!fieldData) {
        return "-"
    }
    if (typeof fieldData === "string" || typeof fieldData === "number") {
        return fieldData
    } else {
        return fieldData[fieldArr[1]]
    }

}