import { ChangeEvent, useContext, useMemo, SyntheticEvent } from 'react'
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  TextField,
  Typography
} from '@mui/material'
import { ColItemType, SliderColItemType, MultitagColItemType } from '../../type'
import CloseIcon from '@mui/icons-material/Close'
import { SearchParamContext } from '../../context/searchParamContext'

interface PropType {
  colItem?: ColItemType
}
const PopoverContent = ({ colItem }: PropType) => {
  if (!colItem || !('type' in colItem)) return null

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
    ) : colItem.type === 'multitag' ? (
      <TagInputContent
        field={colItem.field}
        label={colItem.label}
        tags={colItem.tags}
      />
    ) : null

  return (
    <Box
      display="flex"
      sx={{ m: 1.5, minWidth: '25ch', maxWidth: '50ch', flexWrap: 'wrap' }}
    >
      {InputType}
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
      <InputLabel
        size="small"
        htmlFor={`${field}-input`}
        sx={{ '&.Mui-focused': { color: 'inherit' } }}
      >
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
  marks: SliderColItemType['marks']
  min: SliderColItemType['min']
  max: SliderColItemType['max']
}) => {
  const { searchParams, clearSearchParam, handleSearchParam } =
    useContext(SearchParamContext)
  const value = useMemo(() => searchParams[field], [searchParams, field])
  if (typeof value !== 'number') return null

  const handleSearchStart = () => {
    handleSearchParam(field, String(min))
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
        step={5}
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

const TagInputContent = ({
  field,
  label,
  tags
}: {
  field: ColItemType['field']
  label: ColItemType['label']
  tags: MultitagColItemType['tags']
}) => {
  const { searchParams, clearSearchParam, handleSearchParam } =
    useContext(SearchParamContext)
  const value = useMemo(() => {
    const param = searchParams[field]
    if (typeof param === 'string') return param.split(',')
    return []
  }, [searchParams, field])
  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    eventValue: string[]
  ) => {
    console.log('eventValue', eventValue)
    // if (eventValue.length === 0) {
    //   clearSearchParam(field)
    //   return
    // }
    handleSearchParam(field, eventValue.join(','))
  }
  return (
    <Autocomplete
      clearOnBlur={false}
      clearOnEscape={false}
      fullWidth
      multiple
      options={tags}
      onChange={handleChange}
      // value={value}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}
