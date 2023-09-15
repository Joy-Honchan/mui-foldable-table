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
            <TableCell colSpan={3} />
            <TableCell
              colSpan={2}
              align="center"
              sx={{
                borderLeft: '2px solid #ffffff',
                borderRight: '2px solid #ffffff'
              }}
            >
              Company
            </TableCell>
            <TableCell colSpan={3} />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell
              sx={{
                borderLeft: '2px solid #ffffff',
                borderRight: '2px solid #ffffff'
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                borderLeft: '2px solid #ffffff',
                borderRight: '2px solid #ffffff'
              }}
            >
              Industry
            </TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Website</TableCell>
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
