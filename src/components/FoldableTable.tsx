import { useMemo } from 'react'
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
import DataType, { ColItemType } from '../type.ts'
import getColumnGroup from '../utils/getColumnGroup.ts'

interface PropType {
  columns: ColItemType[]
  innerColumns: ColItemType[]
  rowData: DataType[]
}

const FoldableTable = ({ rowData, columns, innerColumns }: PropType) => {
  const columnGroups = useMemo(() => getColumnGroup(columns), [])
  const innerColumnGroups = useMemo(() => getColumnGroup(innerColumns), [])
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
            {columnGroups.map((group, index) =>
              group.label ? (
                <TableCell
                  key={index}
                  colSpan={group.colSpan}
                  align="center"
                  sx={{
                    borderLeft: '2px solid #ffffff',
                    borderRight: '2px solid #ffffff'
                  }}
                >
                  {group.label}
                </TableCell>
              ) : (
                <TableCell key={index} colSpan={group.colSpan} />
              )
            )}
          </TableRow>
          <TableRow>
            <TableCell />
            {columns.map((item, index) => (
              <TableCell
                key={index}
                sx={
                  item.group
                    ? {
                        borderLeft: '2px solid #ffffff',
                        borderRight: '2px solid #ffffff'
                      }
                    : null
                }
              >
                {item.label}
              </TableCell>
            ))}
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
