import { useState, useEffect, useMemo, useContext } from 'react'
import FoldableTable from './components/FoldableTable'
import DataType, { ColItemType } from './type'
import fetchFakeDate from './utils/fetchFakeData'
import './App.css'
import SearchParamProvider, {
  SearchParamContext
} from './context/searchParamContext'

function App() {
  return (
    <SearchParamProvider>
      <h1>MUI Foldable Table with Search Function</h1>
      <TableContainer />
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
