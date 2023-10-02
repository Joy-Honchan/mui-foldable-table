import { createContext, ReactNode, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchParamType } from '../type'

export const SearchParamContext = createContext({
  searchParams: {} as SearchParamType,
  clearSearchParam: (_field: string) => {},
  handleSearchParam: (_field: string, _value: string) => {}
})

interface SearchFieldType {
  [x: string]: string | number | string[]
}

const SearchParamProvider = ({
  searchFields,
  children
}: {
  searchFields: SearchFieldType
  children: ReactNode
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const param = useMemo(() => {
    return searchFields
      ? Object.keys(searchFields).reduce((acc, item) => {
          const paramString = searchParams.get(item)
          acc[item] = paramString
            ? typeof searchFields[item] === 'number'
              ? Number(paramString)
              : Array.isArray(searchFields[item])
              ? paramString.split(',').filter((item) => item !== '')
              : paramString
            : searchFields[item]
          return acc
        }, {} as SearchParamType)
      : {}
  }, [searchFields, searchParams])

  const clearSearchParam = (field: string) => {
    setSearchParams((prev) => {
      prev.delete(field)
      return prev
    })
  }
  const handleSearchParam = (field: string, value: string) => {
    if (!value) {
      clearSearchParam(field)
    } else {
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
