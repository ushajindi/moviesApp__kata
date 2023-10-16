import { ChangeEvent, Component } from "react";
import Header from "./Components/Header/Header";
import "./App.css";
import MoviesList from "./Components/MoviesList/MoviesList";
import Api, { MovieApiResponse } from "./ApiServices/Api";
// eslint-disable-next-line import/order
import { message, Spin } from "antd";
import PaginationComponent from "./Components/PaginationComponent/PaginationComponent";

export interface MovieType {
  backdropPath: string | null;
  genreIds: number[];
  id: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  // video: boolean;
  voteAverage: number;
  voteCount: number;
}

interface AppState {
  movies: MovieType[] | [];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  movieSearch: string;
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movies: [],
      totalPages: 1,
      currentPage: 1,
      isLoading: true,
      movieSearch: "return",
    };
  }

  componentDidMount() {
    const { currentPage, movieSearch } = this.state;
    this.GetData(currentPage, movieSearch);
  }

  // eslint-disable-next-line no-empty-pattern
  componentDidUpdate({}, prev: AppState) {
    const { currentPage, movieSearch } = this.state;
    if (prev.currentPage !== currentPage) {
      this.GetData(currentPage, movieSearch);
    }
  }

  // eslint-disable-next-line react/sort-comp
  async GetData(page: number, movieQuery: string): Promise<void> {
    this.setState(() => ({
      isLoading: true,
    }));
    try {
      const response: MovieApiResponse = await Api.GetMoviesPage(
        page,
        movieQuery,
      );
      window.scroll(0, 0);
      this.setState(() => {
        const camelCaseResults = response.results.map((movie) => ({
          backdropPath: movie.backdrop_path,
          genreIds: movie.genre_ids,
          id: movie.id,
          originalTitle: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          title: movie.title,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        }));

        return {
          movies: camelCaseResults,
          totalPages: response.total_results,
          currentPage: response.page,
          isLoading: false,
        };
      });
    } catch (e: any) {
      message.error(e);
    }
  }

  OnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { movieSearch } = this.state;
    this.setState(() => ({ movieSearch: e.target.value }));
    this.GetData(1, movieSearch);
  };

  OnChangePagination(page: number) {
    this.setState(() => ({
      currentPage: page,
    }));
  }

  render() {
    const { movieSearch, movies, currentPage, totalPages, isLoading } =
      this.state;
    return (
      <div className="app">
        <Spin size="large" spinning={isLoading}>
          <div className="container">
            <Header
              movieSearch={movieSearch}
              OnChangeSearch={this.OnChangeSearch}
            />
            <MoviesList movies={movies} />
            <PaginationComponent
              OnChangePagination={this.OnChangePagination.bind(this)}
              currentPage={currentPage}
              totalCount={totalPages}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default App;
