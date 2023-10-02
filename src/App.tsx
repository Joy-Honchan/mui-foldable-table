import { useState, useEffect, useMemo, useContext } from 'react'
import FoldableTable from './components/FoldableTable'
import DataType, { ColItemType } from './type'
import fetchFakeDate from './utils/fetchFakeData'
import './App.css'
import SearchParamProvider, {
  SearchParamContext
} from './context/searchParamContext'
import ThemeProvider from './context/ThemeContext'
import { Box, Typography } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ModeToggle from './components/ModeToggle'

function App() {
  return (
    <ThemeProvider>
      <Box
        sx={(theme) => ({
          maxHeight: 'max-content',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          backgroundColor: theme.palette.background.default,
          px: '5%'
        })}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 'medium', color: 'text.primary' }}
        >
          MUI Foldable Table with Search Function
        </Typography>
        <ModeToggle />
        <SearchParamProvider
          searchFields={{ name: '', age: 0, personality: [] }}
        >
          <TableContainer />
        </SearchParamProvider>
      </Box>
    </ThemeProvider>
  )
}

const TableContainer = () => {
  const { searchParams } = useContext(SearchParamContext)
  const [receivedData, setReceivedData] = useState<DataType[] | undefined>(
    undefined
  )
  const columns: ColItemType[] = useMemo(
    () => [
      {
        field: 'id',
        label: 'ID'
      },
      {
        field: 'name',
        label: 'Name',
        type: 'search'
      },
      {
        field: 'company.name',
        label: 'Name',
        group: 'Company'
      },
      {
        field: 'company.industry',
        label: 'Industry',
        group: 'Company'
      },
      {
        field: 'age',
        label: 'Age',
        type: 'slider',
        min: 25,
        max: 35,
        marks: [
          {
            value: 25,
            label: '25'
          },
          {
            value: 30,
            label: '30'
          },
          {
            value: 35,
            label: '35'
          }
        ]
      },
      {
        field: 'gender',
        label: 'Gender'
      },
      {
        field: 'personality',
        label: 'Personality',
        type: 'multitag',
        tags: [
          'Introvert',
          'Extrovert',
          'Creative',
          'Friendly',
          'Humble',
          'Persistent',
          'Reliable',
          'Confident'
        ]
      }
    ],
    []
  )
  const innerColumns: ColItemType[] = useMemo(
    () => [
      {
        field: 'username',
        label: 'UserName'
      },
      {
        field: 'email',
        label: 'Email'
      },
      {
        field: 'address.city',
        label: 'City',
        group: 'Address'
      },
      {
        field: 'address.street',
        label: 'Street',
        group: 'Address'
      },
      {
        field: 'address.suite',
        label: 'Suite',
        group: 'Address'
      },
      {
        field: 'phone',
        label: 'Phone'
      }
    ],
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFakeDate(searchParams)
      setReceivedData(response)
    }
    fetchData()
  }, [searchParams])

  return (
    <>
      {receivedData ? (
        <FoldableTable
          rowData={receivedData}
          columns={columns}
          innerColumns={innerColumns}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default App
