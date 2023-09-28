import { ReactNode } from 'react'
import DataType, { ColItemType } from '../type'
import PersonalityTag from '../components/FoldableTable/PersonalityTag'

export default function displayData(
  colItem: ColItemType,
  rowData: Partial<DataType>
): ReactNode {
  const fieldArr = colItem.field.split('.')

  let fieldData = rowData[fieldArr[0]]
  if (!fieldData) {
    return '-'
  }
  if (typeof fieldData === 'string' || typeof fieldData === 'number') {
    return fieldData
  } else if (Array.isArray(fieldData)) {
    if (!('tags' in colItem)) return
    return fieldData.map((item) => {
      const index = colItem.tags.indexOf(item)
      return <PersonalityTag key={item} label={item} index={index} />
    })
  } else {
    return fieldData[fieldArr[1]]
  }
}
