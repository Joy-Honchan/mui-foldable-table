import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import FoldableRow from './FoldableRow'
import DataType from '../type.ts'

export interface PropType {
  rowData: DataType[]
}

const FoldableTable = ({ rowData }: PropType) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: '1200px',
        minWidth: '800px',
        '.MuiTableCell-root': {
          padding: '10px'
        }
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: '#d8d8d8' }}>
          <TableRow>
            <TableCell />
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>username</TableCell>
            <TableCell>gender</TableCell>
            <TableCell>age</TableCell>
            <TableCell>email</TableCell>
            <TableCell>phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData?.map((item) => (
            <FoldableRow key={item.id} singleRowData={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FoldableTable
