import React, { useState, useEffect } from "react";

import screenq from "./assets/screenq.png"

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";


// API KEY: abc20629

const API_URL = 'http://www.omdbapi.com/?apikey=abc20629'



const App = () => {
 
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const handleKeyPress = (event) => {
    if(event.key === "Enter"){
      searchMovies(searchTerm);
    }
  }
  
  useEffect(() => {
    searchMovies("Action");
   }, []);

   //Making a call to the API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  
  }

  return (
    <div className="App">
      <a href="/">
      <img className="brand" src={screenq} alt="ScreenQuest-Logo"/>
    </a>
      
      

      <div className="search">

            <input
            placeholder="Search for any actor, actress, movie or TV series." 
            value={searchTerm}
            onKeyDown={handleKeyPress}
            onChange={(e)=> setSearchTerm(e.target.value)}
            />

          <img
          src={SearchIcon}
          alt="search"
          onClick={()=> searchMovies(searchTerm)}
          />
        
       </div>

       {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App
