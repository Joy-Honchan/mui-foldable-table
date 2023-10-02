import { MouseEvent, ReactNode, useContext } from 'react'
import { Badge, IconButton, TableCell } from '@mui/material'
import { ColItemType } from '../../type'
import SearchIcon from '@mui/icons-material/Search'
import { SearchParamContext } from '../../context/searchParamContext'

interface PropType {
  colItem: ColItemType
  handleIconClick: (event: MouseEvent<HTMLButtonElement>) => void
}
const TableHeadCell = ({ colItem, handleIconClick }: PropType) => {
  const SearchBtn =
    'type' in colItem ? (
      <IconButton
        color="inherit"
        onClick={handleIconClick}
        id={colItem.field}
        aria-label={`search-${colItem.field}`}
        size="small"
      >
        <ActiveBadge field={colItem.field}>
          <SearchIcon fontSize="inherit" />
        </ActiveBadge>
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
      {SearchBtn}
    </TableCell>
  )
}

const ActiveBadge = ({
  field,
  children
}: {
  field: string
  children: ReactNode
}) => {
  const { searchParams } = useContext(SearchParamContext)
  const paramValue = searchParams[field]
  const invisible =
    !paramValue || (typeof paramValue !== 'number' && paramValue.length) === 0

  return (
    <Badge variant="dot" color="error" invisible={invisible}>
      {children}
    </Badge>
  )
}

export default TableHeadCell
