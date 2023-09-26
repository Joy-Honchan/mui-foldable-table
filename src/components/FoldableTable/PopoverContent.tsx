import { ChangeEvent, useContext, useMemo } from 'react'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { ColItemType } from '../../type'
import CloseIcon from '@mui/icons-material/Close'
import { SearchParamContext } from '../../context/searchParamContext'

interface PropType {
  colItem?: ColItemType
}
const PopoverContent = ({ colItem }: PropType) => {
  if (!colItem) return null
  const { searchParams, clearSearchParam, handleSearchParam } =
    useContext(SearchParamContext)
  const value = useMemo(
    () => searchParams[colItem.field],
    [searchParams, colItem.field]
  )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchParam(colItem.field, e.target.value)
  }
  const handleClear = () => {
    clearSearchParam(colItem.field)
  }

  return (
    <Box display="flex" sx={{ m: 1.5, width: '25ch' }}>
      <FormControl variant="outlined" size="small">
        <InputLabel size="small" htmlFor={`${colItem.field}-input`}>
          {colItem.label}
        </InputLabel>
        <OutlinedInput
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
    </Box>
  )
}

export default PopoverContent
