import { createContext, ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchParamType } from '../type'

export const SearchParamContext = createContext({
  searchParams: {} as SearchParamType,
  clearSearchParam: (_field: string) => {},
  handleSearchParam: (_field: string, _value: string) => {}
})

const SearchParamProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const nameParam = searchParams.get('name')
  const ageParam = Number(searchParams.get('age'))
  const param = { name: nameParam || '', age: ageParam || 0 }

  const clearSearchParam = (field: string) => {
    setSearchParams((prev) =>
      Object.entries(prev)
        .filter(([key, _]) => key !== field)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    )
  }
  const handleSearchParam = (field: string, value: string) => {
    if (!value) {
      clearSearchParam(field)
    } else {
      // setSearchParams((prev) => ({ ...prev, [field]: value }))
      setSearchParams((prev) => {
        prev.set(field, value)
        return prev
      })
    }
  }
  return (
    <SearchParamContext.Provider
      value={{ searchParams: param, clearSearchParam, handleSearchParam }}
    >
      {children}
    </SearchParamContext.Provider>
  )
}

export default SearchParamProvider
