import { Fragment, useState } from 'react'
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DataType from '../type.ts'

const FoldableRow = ({ singleRowData }: { singleRowData: DataType }) => {
  const [open, setOpen] = useState(false)
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
        <TableCell>{singleRowData.gender}</TableCell>
        <TableCell>{singleRowData.age}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell padding="none" colSpan={8}>
          <Collapse in={open}>
            <Table sx={{ backgroundColor: '#ededed' }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>UserName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address City</TableCell>
                  <TableCell>Address Street</TableCell>
                  <TableCell>Address Suite</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Website</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>{singleRowData.username}</TableCell>
                  <TableCell>{singleRowData.email}</TableCell>
                  <TableCell>{singleRowData.address.city}</TableCell>
                  <TableCell>{singleRowData.address.street}</TableCell>
                  <TableCell>{singleRowData.address.suite}</TableCell>
                  <TableCell>{singleRowData.phone}</TableCell>
                  <TableCell>{singleRowData.website}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export default FoldableRow
