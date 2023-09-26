import { useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DataType, { ColItemType } from '../../type.ts'
import getColumnGroup from '../../utils/getColumnGroup.ts'
import displayData from '../../utils/displayData.ts'

interface PropType {
  innerRowData: Partial<DataType>
  innerColumns: ColItemType[]
}

const InnerTable = ({ innerRowData, innerColumns }: PropType) => {
  const innerColumnGroups = useMemo(() => getColumnGroup(innerColumns), [])
  return (
    <Table>
      <TableHead>
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.secondary.contrastText
          })}
        >
          <TableCell />
          {innerColumnGroups.map((group, index) =>
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
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
          })}
        >
          <TableCell />
          {innerColumns.map((item, index) => (
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
        <TableRow
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText
          })}
        >
          <TableCell />
          {innerColumns.map((item, index) => (
            <TableCell key={index}>
              {displayData(item.field, innerRowData)}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default InnerTable
