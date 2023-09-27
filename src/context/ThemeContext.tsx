import { ReactNode, createContext, useMemo, useState } from 'react'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  Theme
} from '@mui/material'
import { indigo, yellow, grey, lightBlue } from '@mui/material/colors'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const theme = useMemo(() => createTheme(generateTheme(mode)), [mode])

  return (
    <ColorModeContext.Provider
      value={{
        toggleColorMode: () => setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  )
}

const generateTheme = (mode: 'light' | 'dark') => {
  if (mode === 'light') {
    return {
      palette: {
        // mode,
        primary: {
          dark: lightBlue[700],
          main: lightBlue[500],
          contrastText: '#ffffff'
        },
        secondary: {
          dark: lightBlue[200],
          main: lightBlue[100],
          light: lightBlue[50],
          contrastText: '#000000'
        },
        background: {
          default: yellow[50],
          paper: '#ffffff'
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
    }
  } else {
    return {
      palette: {
        mode,
        primary: {
          dark: indigo[900],
          main: indigo[600],
          light: indigo['A200'],
          contrastText: '#ffffff'
        },
        secondary: {
          dark: indigo[200],
          main: indigo[100],
          light: indigo[50],
          contrastText: '#000000'
        },
        background: {
          paper: grey[800]
        },
        text: {
          primary: '#ffffff',
          secondary: grey[600]
        }
        // primary: {
        //   dark: grey[600],
        //   main: grey[700],
        //   contrastText: '#ffffff'
        // },
        // secondary: {
        //   dark: grey[400],
        //   main: grey[300],
        //   light: grey[200],
        //   contrastText: '#000000'
        // },
        // background: {
        //   paper: grey[900]
        // },
        // text: {
        //   primary: '#ffffff',
        //   secondary: grey[600]
        // }
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            root: {
              color: 'inherit'
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: {
              color: 'inherit',
              borderColor: 'inherit'
            }
          }
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: 'inherit'
            }
          }
        },
        MuiSlider: {
          styleOverrides: {
            root: ({ theme }: { theme: Theme }) => ({
              color: theme.palette.primary.light
            })
          }
        }
      }
    }
  }
}
export default ThemeProvider
