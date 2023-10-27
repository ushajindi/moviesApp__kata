import { Component } from "react";
import { message, Spin } from "antd";
import MoviesList from "../MoviesList/MoviesList";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import { MovieType } from "../../App";

interface AppState {
  movies: MovieType[] | [];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
}

class RatedMovies extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      totalPages: 0,
      currentPage: 1,
      isLoading: false,
    };
  }

  componentDidMount() {
    const localData = localStorage.getItem("movie");
    if (localData) {
      try {
        const abstractData = JSON.parse(localData);
        this.setState(() => ({
          movies: abstractData,
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

  render() {
    const { movies, totalPages, currentPage, isLoading } = this.state;
    return (
      <Spin size="large" spinning={isLoading}>
        {movies.length !== 0 && <MoviesList movies={movies} />}
        <PaginationComponent
          totalCount={totalPages}
          currentPage={currentPage}
          OnChangePagination={this.OnChangePagination}
        />
      </Spin>
    );
  }
}

export default RatedMovies;
