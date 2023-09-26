import { ChangeEvent, useContext, useMemo } from 'react'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  Typography
} from '@mui/material'
import { ColItemType } from '../../type'
import CloseIcon from '@mui/icons-material/Close'
import { SearchParamContext } from '../../context/searchParamContext'

interface PropType {
  colItem?: ColItemType
}
const PopoverContent = ({ colItem }: PropType) => {
  if (!colItem) return null
  // const { searchParams, clearSearchParam, handleSearchParam } =
  //   useContext(SearchParamContext)
  // const value = useMemo(
  //   () => searchParams[colItem.field],
  //   [searchParams, colItem.field]
  // )
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   handleSearchParam(colItem.field, e.target.value)
  // }
  // const handleClear = () => {
  //   clearSearchParam(colItem.field)
  // }

  const InputType =
    colItem.type === 'search' ? (
      <TextInputContent field={colItem.field} label={colItem.label} />
    ) : colItem.type === 'slider' ? (
      <SliderInputContent
        field={colItem.field}
        label={colItem.label}
        marks={colItem.marks}
        min={colItem.min}
        max={colItem.max}
      />
    ) : null

  return (
    <Box display="flex" sx={{ m: 1.5, width: '25ch', flexWrap: 'wrap' }}>
      {InputType}
      {/* <FormControl variant="outlined" size="small">
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
      </FormControl> */}
    </Box>
  )
}

export default PopoverContent

const TextInputContent = ({
  field,
  label
}: {
  field: ColItemType['field']
  label: ColItemType['label']
}) => {
  const { searchParams, clearSearchParam, handleSearchParam } =
    useContext(SearchParamContext)
  const value = useMemo(() => searchParams[field], [searchParams, field])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchParam(field, e.target.value)
  }
  const handleClear = () => {
    clearSearchParam(field)
  }
  return (
    <FormControl variant="outlined" size="small">
      <InputLabel size="small" htmlFor={`${field}-input`}>
        {label}
      </InputLabel>
      <OutlinedInput
        value={value}
        onChange={handleChange}
        id={`${field}-input`}
        size="small"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  )
}

const SliderInputContent = ({
  field,
  label,
  marks,
  min,
  max
}: {
  field: ColItemType['field']
  label: ColItemType['label']
  marks: ColItemType['marks']
  min: ColItemType['min']
  max: ColItemType['max']
}) => {
  const { searchParams, clearSearchParam, handleSearchParam } =
    useContext(SearchParamContext)
  const value = useMemo(() => searchParams[field], [searchParams, field])
  if (typeof value !== 'number') return null

  const handleSearchStart = () => {
    handleSearchParam(field, String(min || 26))
  }
  const handleChange = (_: Event, newValue: number | number[]) => {
    handleSearchParam(field, String(newValue))
  }
  const handleClear = () => {
    clearSearchParam(field)
  }
  return (
    <>
      <Typography sx={{ flexGrow: 1 }}>{label}</Typography>
      <Slider
        disabled={value === 0}
        sx={{ mx: 1 }}
        aria-label={`${field}-slider`}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        marks={marks}
      />
      <Box display="flex" width={'100%'} justifyContent={'flex-end'}>
        {value === 0 ? (
          <Button onClick={handleSearchStart}>Search</Button>
        ) : (
          <Button onClick={handleClear}>Clear</Button>
        )}
      </Box>
    </>
  )
}
