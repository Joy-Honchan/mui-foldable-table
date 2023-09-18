import {
  memo,
  useMemo,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction
} from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Popover,
  Box
} from '@mui/material'
import FoldableRow from './FoldableRow.tsx'
import DataType, { ColItemType, SearchParamType } from '../../type.ts'
import getColumnGroup from '../../utils/getColumnGroup.ts'
import TableHeadCell from './TableHeadCell.tsx'
import PopoverContent from './PopoverContent.tsx'

interface PropType {
  columns: ColItemType[]
  innerColumns: ColItemType[]
  rowData: DataType[]
  searchParams: SearchParamType
  setSearchParams: Dispatch<SetStateAction<SearchParamType>>
}

const FoldableTable = ({
  rowData,
  columns,
  innerColumns,
  setSearchParams
}: PropType) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const columnGroups = useMemo(() => getColumnGroup(columns), [columns])

  const open = Boolean(anchorEl)
  const popoverId = anchorEl ? anchorEl.id : undefined
  const popoverColItem = useMemo(
    () => columns.find((item) => item.field === popoverId),
    [columns, popoverId]
  )
  const handleIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = (field: string, value: string) => {
    setSearchParams({
      [field]: value
    })
  }
  return (
    <>
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
                <TableHeadCell
                  key={index}
                  colItem={item}
                  handleIconClick={handleIconClick}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData?.map((item, index) => (
              <FoldableRow
                key={index}
                singleRowData={item}
                columns={columns}
                innerColumns={innerColumns}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box display="flex" sx={{ m: 1.5, width: '25ch' }}>
          <PopoverContent
            colItem={popoverColItem}
            handleSearch={handleSearch}
          />
        </Box>
      </Popover>
    </>
  )
}

export default memo(FoldableTable)
