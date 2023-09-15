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
        minWidth: '800px'
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: '#d8d8d8' }}>
          <TableRow>
            <TableCell />
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age</TableCell>
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
