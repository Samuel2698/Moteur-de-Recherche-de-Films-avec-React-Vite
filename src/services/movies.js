const apiKey = import.meta.env.VITE_API_KEY

export async function searchMovies({ search }) {
  if (search === '') return null

  try {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`
    )
    const data = await res.json()

    const movies = data.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (err) {
    throw new Error("Couldn't search movies")
  }
}
