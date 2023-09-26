import { ReactNode } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { indigo, yellow, grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      dark: indigo[900],
      main: indigo[600],
      contrastText: '#ffffff'
    },
    secondary: {
      dark: indigo[200],
      main: indigo[100],
      light: indigo[50],
      contrastText: '#000000'
    },
    background: {
      default: yellow[50]
    },
    text: {
      primary: grey[900],
      secondary: grey[600]
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'inherit'
        }
      }
    }
  }
})

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

export default ThemeProvider
