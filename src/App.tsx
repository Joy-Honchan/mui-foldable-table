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
    <SearchParamProvider>
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
          <TableContainer />
        </Box>
      </ThemeProvider>
    </SearchParamProvider>
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
        min: 26,
        max: 35,
        marks: [
          {
            value: 26,
            label: '26'
          },
          {
            value: 27,
            label: '27'
          },
          {
            value: 28,
            label: '28'
          },
          {
            value: 29,
            label: '29'
          },
          {
            value: 30,
            label: '30'
          },
          {
            value: 31,
            label: '31'
          },
          {
            value: 32,
            label: '32'
          },
          {
            value: 33,
            label: '33'
          },
          {
            value: 34,
            label: '34'
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
        field: 'website',
        label: 'Website'
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
