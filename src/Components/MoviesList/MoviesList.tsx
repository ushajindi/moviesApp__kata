import { Component } from "react";
import "./MoviesList.css";
import Movie from "../Movie/Movie";
import { MovieType } from "../../App";

type PropsType = {
  movies: MovieType[];
};

class MoviesList extends Component<PropsType> {
  render() {
    const { movies } = this.props;
    return (
      <div className="movie__inner">
        {movies.map((movie) => {
          return <Movie movie={movie} key={movie.id} />;
        })}
      </div>
    );
  }
}

export default MoviesList;
