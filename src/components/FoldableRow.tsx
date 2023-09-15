import { Fragment, useState } from 'react'
import { Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import InnerTable from './InnerTable.tsx'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DataType from '../type.ts'

const FoldableRow = ({ singleRowData }: { singleRowData: DataType }) => {
  const [open, setOpen] = useState(false)
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
        <TableCell>{singleRowData.id}</TableCell>
        <TableCell>{singleRowData.name}</TableCell>
        <TableCell>{singleRowData.company.name}</TableCell>
        <TableCell>{singleRowData.company.industry}</TableCell>
        <TableCell>{singleRowData.age}</TableCell>
        <TableCell>{singleRowData.gender}</TableCell>
        <TableCell>{singleRowData.website}</TableCell>
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
