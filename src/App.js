import React,{useState,useEffect} from 'react'
import "./styles.css"
import axios from 'axios'
import MovieCard from './MovieCard';

function App() {
  const [movieName,setMovieName] = useState("");
  const [popularMovies,setPopularMovies] = useState([]);
  const [searchedMovies,setSearchedMovies] = useState([])

  useEffect( () => {
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716")
    .then( (res) => { setPopularMovies(res.data.results) } )
  } , [])

  useEffect( () => {
    if(movieName == ""){
      setSearchedMovies([])
    }else{
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=cfe422613b250f702980a3bbf9e90716`) 
    .then( (res) => {
      console.log(res.data.results);
      setSearchedMovies(res.data.results)
    })
  }
  },[movieName])

  return (
    <>
    <form className='search' >
    <input type="search" value= {movieName}
    placeholder="Search for Movie Title …"
    onChange={ (e) => { setMovieName(e.target.value)  }  } />
    </form>


   {searchedMovies.length == 0 && movieName == "" ? <div className='movies-wrapper' >
      { popularMovies.map( (movie,i) => {
        return (
          <MovieCard 
          poster_path = {movie.poster_path}
          original_title = {movie.original_title}
           />
        )
      })}
     
    </div> : <div className='movies-wrapper' >
      { searchedMovies.map( (movie,i) => {
        return (
          <MovieCard 
          poster_path = {movie.poster_path}
          original_title = {movie.original_title}
           />
        )
      })}
     
    </div> }


    </>
  )
}

export default App