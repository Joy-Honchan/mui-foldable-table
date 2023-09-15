import { Fragment, useState } from 'react'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
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
        <TableCell>{singleRowData.age}</TableCell>
        <TableCell>{singleRowData.gender}</TableCell>
        <TableCell>{singleRowData.website}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell padding="none" colSpan={8}>
          <Collapse in={open}>
            <Table sx={{ backgroundColor: '#ededed' }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell
                    colSpan={3}
                    align="center"
                    sx={{
                      borderLeft: '2px solid #bcbcbc',
                      borderRight: '2px solid #bcbcbc'
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell colSpan={2} />
                </TableRow>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>UserName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell
                    sx={{
                      borderLeft: '2px solid #bcbcbc',
                      borderRight: '2px solid #bcbcbc'
                    }}
                  >
                    City
                  </TableCell>
                  <TableCell
                    sx={{
                      borderLeft: '2px solid #bcbcbc',
                      borderRight: '2px solid #bcbcbc'
                    }}
                  >
                    Street
                  </TableCell>
                  <TableCell
                    sx={{
                      borderLeft: '2px solid #bcbcbc',
                      borderRight: '2px solid #bcbcbc'
                    }}
                  >
                    Suite
                  </TableCell>
                  <TableCell>Phone</TableCell>
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
