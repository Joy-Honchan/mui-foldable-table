import { Fragment, memo, useMemo, useState, MouseEvent } from 'react'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import InnerTable from './InnerTable.tsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DataType, { ColItemType } from '../../type.ts'
import displayData from '../../utils/displayData.ts'

interface PropType {
  open: boolean
  handleRowOpen: (e: MouseEvent<HTMLButtonElement>) => void
  singleRowData: DataType
  columns: ColItemType[]
  innerColumns: ColItemType[]
}

const FoldableRow = ({
  open,
  handleRowOpen,
  singleRowData,
  columns,
  innerColumns
}: PropType) => {
  // const [open, setOpen] = useState(false)

  const innerRowData: Partial<DataType> = useMemo(() => {
    const innerDataArr = innerColumns.map((item) => {
      if (item.field.indexOf('.') === -1)
        return { [item.field]: singleRowData[item.field] }
      const fieldArr = item.field.split('.')
      return { [fieldArr[0]]: singleRowData[fieldArr[0]] }
    })
    const innerDataObj = Object.assign({}, ...innerDataArr)
    return innerDataObj
  }, [singleRowData, innerColumns])

  return (
    <Fragment>
      <TableRow>
        <TableCell padding="checkbox">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleRowOpen}
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
        <TableCell padding="none" colSpan={columns.length + 1}>
          <Collapse in={open}>
            <InnerTable
              innerColumns={innerColumns}
              innerRowData={innerRowData}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default memo(FoldableRow)
