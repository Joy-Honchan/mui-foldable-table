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
import { ChangeEvent } from 'react'

interface PropType {
  colItem?: ColItemType
  handleSearch: (field: string, value: string) => void
}
const PopoverContent = ({ colItem, handleSearch }: PropType) => {
  if (!colItem) return null
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(colItem.field, e.target.value)
    // console.log('popovercontent', colItem.field, e.target.value)
  }

  return (
    <FormControl variant="outlined" size="small">
      <InputLabel size="small" htmlFor={`${colItem.field}-input`}>
        {colItem.label}
      </InputLabel>
      <OutlinedInput
        onChange={handleChange}
        id={`${colItem.field}-input`}
        size="small"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => console.log('clicked')} edge="end">
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
