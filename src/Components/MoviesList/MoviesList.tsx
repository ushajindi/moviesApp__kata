import { Component } from "react";
import Movie from "../Movie/Movie";
import { MovieType } from "../../App";
import "./MoviesList.css";

type PropsType = {
  movies: MovieType[];
};

class MoviesList extends Component<PropsType> {
  render() {
    const { movies } = this.props;
    return (
      <div className="movie__inner">
        {movies.map((movie) => {
          return <Movie movie={movie} key={movie.movieId} />;
        })}
      </div>
    );
  }
}

export default MoviesList;
