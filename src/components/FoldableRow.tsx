import { Fragment, useState } from 'react'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import InnerTable from './InnerTable.tsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DataType, { ColItemType } from '../type.ts'

interface PropType {
  singleRowData: DataType
  columns: ColItemType[]
}

const FoldableRow = ({ singleRowData, columns }: PropType) => {
  const [open, setOpen] = useState(false)

  const displayData = (colName: string, rowData: DataType) => {
    const fieldArr = colName.split('.')
    const fieldData = rowData[fieldArr[0]]
    if (typeof fieldData !== 'string' && typeof fieldData !== 'number') {
      return fieldData[fieldArr[1]]
    } else {
      return fieldData
    }
  }

  const innerRowData = {
    address: singleRowData.address,
    username: singleRowData.username,
    email: singleRowData.email,
    phone: singleRowData.phone
  }
  return (
    <Fragment>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((item, index) => (
          <TableCell key={index}>
            {displayData(item.field, singleRowData)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell padding="none" colSpan={8}>
          <Collapse in={open}>
            <InnerTable<
              Pick<DataType, 'address' | 'username' | 'email' | 'phone'>
            >
              innerRowData={innerRowData}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default FoldableRow
