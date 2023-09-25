// import { useLocation } from 'react-router-dom'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { ColItemType } from '../../type'
import CloseIcon from '@mui/icons-material/Close'
import { ChangeEvent, useContext, useMemo, useRef } from 'react'
import { SearchParamContext } from '../../context/searchParamContext'

interface PropType {
  colItem?: ColItemType
  handleSearch: (field: string, value: string) => void
  clearSearch: (field: string) => void
}
const PopoverContent = ({ colItem, handleSearch, clearSearch }: PropType) => {
  if (!colItem) return null
  const { searchParams, setSearchParams: _ } = useContext(SearchParamContext)
  const value = useMemo(
    () => searchParams[colItem.field],
    [searchParams, colItem.field]
  )
  const inpuRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(colItem.field, e.target.value)
    // console.log('popovercontent', colItem.field, e.target.value)
  }
  const handleClear = () => {
    clearSearch(colItem.field)
  }

  return (
    <FormControl variant="outlined" size="small">
      <InputLabel size="small" htmlFor={`${colItem.field}-input`}>
        {colItem.label}
      </InputLabel>
      <OutlinedInput
        ref={inpuRef}
        value={value}
        onChange={handleChange}
        id={`${colItem.field}-input`}
        size="small"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
        label={colItem.label}
      />
    </FormControl>
  )
}

export default PopoverContent
