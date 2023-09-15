import { useState, useEffect, useMemo } from 'react'
import FoldableTable from './components/FoldableTable'
import DataType, { ColItemType } from './type'
import data from './fakeData.json'

import './App.css'

const DATA = data as DataType[]

function App() {
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
        label: 'Name'
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
      const response = await new Promise<DataType[]>((resolve) =>
        setTimeout(() => resolve(DATA), 1000)
      )
      setReceivedData(response)
    }
    fetchData()
  }, [])

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
