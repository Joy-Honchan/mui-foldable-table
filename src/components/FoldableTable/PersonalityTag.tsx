import { Chip } from '@mui/material'
interface PropType {
  label: string
  index: number
}
const PersonalityTag = ({ label, index }: PropType) => {
  const bgColor =
    index % 3 === 0 ? 'success' : index % 3 === 1 ? 'warning' : 'info'
  return <Chip label={label} color={bgColor} />
}

export default PersonalityTag
