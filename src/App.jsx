import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 800),
    [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className="app">
      <header>
        <h1>Moteur de recherche de films</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Barbie, Oppenheimer..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button>Chercher</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '50px' }}>Loading...</p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  )
}

export default App
