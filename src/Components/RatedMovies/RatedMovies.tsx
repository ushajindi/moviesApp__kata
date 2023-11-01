import { Component } from "react";
import { message } from "antd";
import MoviesList from "../MoviesList/MoviesList";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import { MovieType } from "../../App";

interface AppState {
  movies: MovieType[] | [];
  totalPages: number;
  currentPage: number;
}

class RatedMovies extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      totalPages: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    const localData = localStorage.getItem("movie");
    if (localData) {
      try {
        const abstractData = JSON.parse(localData);
        this.setState(() => ({
          movies: abstractData,
          totalPages: abstractData.length,
        }));
      } catch (e) {
        message.error("Error", 1);
      }
    }
  }

  OnChangePagination = (page: number) => {
    this.setState(() => ({
      currentPage: page,
    }));
  };

  MoviesPageControll(): MovieType[] {
    const { movies, currentPage } = this.state;
    const itemsPerPage = 20;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return movies.slice(startIndex, endIndex);
  }

  render() {
    const { movies, currentPage, totalPages } = this.state;
    return (
      <>
        {movies.length !== 0 && (
          <MoviesList movies={this.MoviesPageControll()} />
        )}
        {totalPages > 0 && (
          <PaginationComponent
            totalCount={totalPages}
            currentPage={currentPage}
            OnChangePagination={this.OnChangePagination}
          />
        )}
      </>
    );
  }
}

export default RatedMovies;
