import { useState, useEffect } from 'react'
import DataType from './type'
import data from './fakeData.json'
import './App.css'

const DATA = data as DataType[]

function App() {
  const [receivedData, setReceivedData] = useState<DataType[] | undefined>(
    undefined
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
      {receivedData?.map((data) => <div key={data.id}>{data.name}</div>) || (
        <div>Loading...</div>
      )}
    </>
  )
}

export default App
