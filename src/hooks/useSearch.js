import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Pas de contenu')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('Pas de chiffres')
      return
    }
    if (search.length < 3) {
      setError('Doit contenir plus de 3 caractères')
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}
