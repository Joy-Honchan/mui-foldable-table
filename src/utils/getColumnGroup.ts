import { ColItemType, ColumnGroupType } from '../type.ts'


export default function getColumnGroup(columns: ColItemType[]): ColumnGroupType[] {
    let result: ColumnGroupType[] = [
        {
            label: columns[0].group || '',
            colSpan: 1
        }
    ]
    for (let i = 1; i < columns.length; i++) {
        const group = columns[i].group
        if (group) {
            if (result[result.length - 1].label === group) {
                result[result.length - 1].colSpan++
            } else {
                result.push({
                    label: group,
                    colSpan: 1
                })
            }
        } else {
            if (!result[result.length - 1].label) {
                result[result.length - 1].colSpan++
            } else {
                result.push({
                    label: '',
                    colSpan: 1
                })
            }
        }
    }
    return result
}