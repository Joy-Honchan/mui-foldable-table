import { useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from '../context/ThemeContext'
import { Box, Button, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const ModeToggle = () => {
  const theme = useTheme()
  const { toggleColorMode } = useContext(ColorModeContext)
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Button
        size="large"
        variant="outlined"
        onClick={toggleColorMode}
        endIcon={
          theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )
        }
      >
        {theme.palette.mode} mode
      </Button>
    </Box>
  )
}

export default ModeToggle
