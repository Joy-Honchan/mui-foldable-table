import { MouseEvent } from 'react'
import { IconButton, TableCell } from '@mui/material'
import { ColItemType } from '../type'
import SearchIcon from '@mui/icons-material/Search'

interface PropType {
  colItem: ColItemType
  handleIconClick: (event: MouseEvent<HTMLButtonElement>) => void
}
const TableHeadCell = ({ colItem, handleIconClick }: PropType) => {
  const TypeIcon =
    colItem.type === 'search' ? (
      <IconButton
        onClick={handleIconClick}
        id={colItem.field}
        aria-label={`search-${colItem.field}`}
        size="small"
      >
        <SearchIcon fontSize="inherit" />
      </IconButton>
    ) : null
  return (
    <TableCell
      sx={
        colItem.group
          ? {
              borderLeft: '2px solid #ffffff',
              borderRight: '2px solid #ffffff'
            }
          : null
      }
    >
      {colItem.label}
      {TypeIcon}
    </TableCell>
  )
}

export default TableHeadCell
