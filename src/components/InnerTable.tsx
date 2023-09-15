import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DataType from '../type.ts'

interface PropType<K> {
  innerRowData: K
}

const InnerTable = <T extends Partial<DataType>>({
  innerRowData
}: PropType<T>) => {
  return (
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
          <TableCell>{innerRowData.username}</TableCell>
          <TableCell>{innerRowData.email}</TableCell>
          <TableCell>{innerRowData.address?.city}</TableCell>
          <TableCell>{innerRowData.address?.street}</TableCell>
          <TableCell>{innerRowData.address?.suite}</TableCell>
          <TableCell>{innerRowData.phone}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default InnerTable
