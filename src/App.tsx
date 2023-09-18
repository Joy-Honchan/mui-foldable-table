import { useState, useEffect, useMemo } from 'react'
import FoldableTable from './components/FoldableTable'
import DataType, { ColItemType, SearchParamType } from './type'
import fetchFakeDate from './utils/fetchFakeData'
import './App.css'

function App() {
  const [searchParams, setSearchParams] = useState<SearchParamType>({})
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
        label: 'Age'
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
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default App
