import { createContext, ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SetURLSearchParams } from 'react-router-dom'
import { SearchParamType } from '../type'

export const SearchParamContext = createContext({
  searchParams: {} as SearchParamType,
  setSearchParams: (() => {}) as SetURLSearchParams
})

const SearchParamProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const nameParam = searchParams.get('name')
  const param = { name: nameParam || '' }
  return (
    <SearchParamContext.Provider
      value={{ searchParams: param, setSearchParams }}
    >
      {children}
    </SearchParamContext.Provider>
  )
}

export default SearchParamProvider
