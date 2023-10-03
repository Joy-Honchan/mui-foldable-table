import { memo, useMemo, useState, MouseEvent } from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Popover,
  Typography
} from '@mui/material'
import FoldableRow from './FoldableRow.tsx'
import DataType, { ColItemType, SearchParamType } from '../../type.ts'
import getColumnGroup from '../../utils/getColumnGroup.ts'
import TableHeadCell from './TableHeadCell.tsx'
import PopoverContent from './PopoverContent.tsx'
import SearchOffIcon from '@mui/icons-material/SearchOff'

interface PropType {
  columns: ColItemType[]
  innerColumns: ColItemType[]
  rowData: DataType[]
  searchParams?: SearchParamType
}

const FoldableTable = ({ rowData, columns, innerColumns }: PropType) => {
  const [openRowId, setOpenRowId] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const columnGroups = useMemo(() => getColumnGroup(columns), [columns])

  const popoverOpen = Boolean(anchorEl)
  const popoverId = anchorEl ? anchorEl.id : undefined
  const popoverColItem = useMemo(
    () => columns.find((item) => item.field === popoverId),
    [columns, popoverId]
  )

  const handleRowOpen = (id: DataType['id']) => {
    return (_: MouseEvent<HTMLButtonElement>) => {
      if (openRowId === id) {
        setOpenRowId(null)
      } else {
        setOpenRowId(id)
      }
    }
  }

  const handleIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'background.paper',
          minHeight: '600px',
          // maxWidth: '1200px',
          // minWidth: '800px',
          '.MuiTableCell-root': {
            fontSize: '1rem'
          },
          '.MuiTableCell-sizeMedium:not(.MuiTableCell-paddingNone)': {
            paddingY: 1
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={(theme) => ({
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText
              })}
            >
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
            <TableRow
              sx={(theme) => ({
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              })}
            >
              <TableCell />
              {columns.map((item, index) => (
                <TableHeadCell
                  key={index}
                  colItem={item}
                  handleIconClick={handleIconClick}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.length !== 0 ? (
              rowData.map((item, index) => {
                const open = openRowId === item.id
                return (
                  <FoldableRow
                    open={open}
                    handleRowOpen={handleRowOpen(item.id)}
                    key={index}
                    singleRowData={item}
                    columns={columns}
                    innerColumns={innerColumns}
                  />
                )
              })
            ) : (
              <TableRow sx={{ height: '100%' }}>
                <TableCell colSpan={columns.length + 1} sx={{ border: 0 }}>
                  <Typography variant="h1" textAlign={'center'} sx={{ mt: 2 }}>
                    <SearchOffIcon fontSize="inherit" />
                  </Typography>
                  <Typography variant="h6" textAlign={'center'}>
                    No Data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={popoverId}
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <PopoverContent colItem={popoverColItem} />
      </Popover>
    </>
  )
}

export default memo(FoldableTable)
