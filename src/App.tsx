import './App.css'
import axios from 'axios';
import {useEffect, useState} from "react";

function App() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDVmOGMyYWNjZWJmZmM2MTZjY2YwMzIwMjU0NzAzNyIsIm5iZiI6MTcyNzYwMzI1OS4zNzE0OTMsInN1YiI6IjVlYmZmODg0NmQ2NzVhMDAyMTdlYTRiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LdB9SeM3CFM8mGwAaIdEztMIPWHSqi57dzhayCGSFjM',
                'accept': 'application/json',
            }
        })
            .then(response => {
                const newMovies = response.data.results;
                movies.push(...newMovies);
                setMovies([...movies]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page]);

    return (
        <>
            <div style={containerStyle}>
                {movies && movies.map((movie: any) => (
                    <div style={itemStyle} key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt=""/>
                        <div>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => setPage(page + 1)}>Load more</button>
        </>
    )
}

const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
};

const itemStyle = {
    flex: '1 1 30%',
    boxSizing: 'border-box',
    padding: '10px',
};

export default App