import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { ColItemType } from '../../type'
import CloseIcon from '@mui/icons-material/Close'

interface PropType {
  colItem?: ColItemType
  // handleSearch: (field: string, value: string) => void
}
const PopoverContent = ({ colItem }: PropType) => {
  if (!colItem) return null

  return (
    <FormControl variant="outlined" size="small">
      <InputLabel size="small" htmlFor={`${colItem.field}-input`}>
        {colItem.label}
      </InputLabel>
      <OutlinedInput
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
