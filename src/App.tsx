import { ChangeEvent, Component } from "react";
import Header from "./Components/Header/Header";
import "./App.css";
import MoviesList from "./Components/MoviesList/MoviesList";
import Api, { GenreType, MovieApiResponse } from "./ApiServices/Api";
// eslint-disable-next-line import/order
import { Spin, Alert, message } from "antd";
import PaginationComponent from "./Components/PaginationComponent/PaginationComponent";
import MovieContext from "./Components/Context/MovieContext";
import RatedMovies from "./Components/RatedMovies/RatedMovies";

export interface MovieType {
  backdropPath: string | null;
  genreIds: number[];
  movieId: string;
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
  error: {
    isError: boolean;
    errorMessage: string;
  };
  genre: GenreType[] | null;
  page: "Search" | "Rated";
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
      error: {
        isError: false,
        errorMessage: "",
      },
      genre: null,
      page: "Search",
    };
  }

  componentDidMount() {
    const { currentPage, movieSearch } = this.state;
    this.GetData(currentPage, movieSearch);
    this.GetGenres();
  }

  // eslint-disable-next-line no-empty-pattern
  componentDidUpdate({}, prev: AppState) {
    const { currentPage, movieSearch } = this.state;
    if (prev.currentPage !== currentPage) {
      this.GetData(currentPage, movieSearch);
    }
  }

  // eslint-disable-next-line react/sort-comp
  async GetGenres() {
    try {
      const data = await Api.getGenres().then((res: Response) => res.json());
      this.setState({
        genre: data.genres,
      });
    } catch (e: any) {
      message.error(e || "", 1000);
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
          movieId: movie.id,
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
      if (e instanceof Error) {
        this.setState(() => ({
          isLoading: false,
          error: {
            errorMessage: e.massage,
            isError: true,
          },
        }));
      }
    }
  }

  OnPageRouter = (page: "Search" | "Rated") => {
    this.setState(() => ({
      page,
    }));
  };

  OnPageController() {
    const { movieSearch, movies, currentPage, totalPages, genre, page } =
      this.state;
    switch (page) {
      case "Search": {
        return (
          <>
            <Header
              OnPageRouter={this.OnPageRouter}
              Page={page}
              movieSearch={movieSearch}
              OnChangeSearch={this.OnChangeSearch}
            />
            <MovieContext.Provider
              value={{ genre: genre || [], setRating: Api.setRating }}
            >
              <MoviesList movies={movies} />
            </MovieContext.Provider>

            <PaginationComponent
              OnChangePagination={this.OnChangePagination.bind(this)}
              currentPage={currentPage}
              totalCount={totalPages}
            />
          </>
        );
      }
      case "Rated": {
        return (
          <>
            <Header
              OnPageRouter={this.OnPageRouter}
              Page={page}
              movieSearch={movieSearch}
              OnChangeSearch={this.OnChangeSearch}
            />
            <MovieContext.Provider
              value={{ genre: genre || [], setRating: Api.setRating }}
            >
              <RatedMovies />
            </MovieContext.Provider>
          </>
        );
      }
      default: {
        return <> </>;
      }
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

  ErrorViewer() {
    const {
      error: { errorMessage },
    } = this.state;
    return (
      <div className="error">
        <Alert
          message="Error"
          description={errorMessage}
          type="error"
          showIcon
        />
      </div>
    );
  }

  render() {
    const {
      isLoading,
      error: { isError },
    } = this.state;
    return (
      <div className="app">
        <Spin size="large" spinning={isLoading}>
          <div className="container">
            {isError ? this.ErrorViewer() : this.OnPageController()}
          </div>
        </Spin>
      </div>
    );
  }
}

export default App;
