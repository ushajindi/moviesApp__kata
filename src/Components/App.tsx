import { ChangeEvent, Component } from "react";
import { Spin, Alert, message } from "antd";
import Api, { GenreType, MovieApiResponse } from "../ApiServices/Api";
import Header from "./Header/Header";
import MoviesList from "./MoviesList/MoviesList";
import PaginationComponent from "./PaginationComponent/PaginationComponent";
import MovieContext from "./Context/MovieContext";
import RatedMovies from "./RatedMovies/RatedMovies";
import "./App.css";

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

  componentDidUpdate({}, prev: AppState) {
    const { currentPage, movieSearch } = this.state;
    if (prev.currentPage !== currentPage) {
      this.GetData(currentPage, movieSearch);
    }
  }

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
      if (response.total_results === 0) {
        message.success("Not Found", 1);
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
      }

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
    const { movies, currentPage, totalPages, genre, page } = this.state;
    switch (page) {
      case "Search": {
        return (
          <>
            <Header
              OnPageRouter={this.OnPageRouter}
              Page={page}
              OnChangeSearch={this.OnChangeSearch}
            />
            <MovieContext.Provider
              value={{
                genre: genre || [],
                setRating: Api.setRating,
                page,
              }}
            >
              <MoviesList movies={movies} />
            </MovieContext.Provider>
            {totalPages > 20 && (
              <PaginationComponent
                OnChangePagination={this.OnChangePagination.bind(this)}
                currentPage={currentPage}
                totalCount={totalPages}
              />
            )}
          </>
        );
      }
      case "Rated": {
        return (
          <>
            <Header
              OnPageRouter={this.OnPageRouter}
              Page={page}
              OnChangeSearch={this.OnChangeSearch}
            />
            <MovieContext.Provider
              value={{
                genre: genre || [],
                setRating: Api.setRating,
                page,
              }}
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
