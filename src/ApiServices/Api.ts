import { message } from "antd";
import { MovieType } from "../Components/App.tsx";

export interface MovieResponseType {
  backdrop_path: string | null;
  genre_ids: number[];
  id: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  // video: boolean;
  vote_average: number;
  vote_count: number;
}

export type GenreType = {
  id: number | string;
  name: string;
};

export interface MovieApiResponse {
  page: number;
  results: MovieResponseType[];
  total_pages: number;
  total_results: number;
}
export default class Api {
  static TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjVlNjNiZDRiYWI3NTRiMGU0NjlmYzI2M2YyMmM0YSIsInN1YiI6IjY1MmI3ZjZkMGNiMzM1MTZmNzQ3OTg3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAyYNbZta3NSEViuW3z4Tx_JlAM574rW29JNZFBCM6Y";

  static _Basic_Url(query: string = "return", page: number = 1): string {
    return `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  }

  static async getGenres(): Promise<Response> {
    await this.getGuestSessionId();
    return await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: Api.TOKEN,
        },
      },
    );
  }

  static async getGuestSessionId() {
    await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: Api.TOKEN,
        },
      },
    )
      .then((response) => response.json())
      .then((res) => {
        sessionStorage.setItem("guest_session_id", res.guest_session_id);
      });
  }

  static async GetMoviesPage(
    page: number,
    movieName: string,
  ): Promise<MovieApiResponse> {
    const response = await fetch(this._Basic_Url(movieName, page), {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: Api.TOKEN,
      },
    });
    return (await response.json()) as MovieApiResponse;
  }

  static setRating(id: string | number, rating: number, movie: MovieType) {
    const sessionGuestId = sessionStorage.getItem("guest_session_id");
    if (sessionGuestId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionGuestId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
            Authorization: Api.TOKEN,
          },
          body: JSON.stringify({ value: rating }),
        },
      ).then((res) => {
        if (res.status === 201) {
          message.success("Movie Rated Success", 1);
          const movieRatedString = localStorage.getItem("movie");
          if (movieRatedString) {
            const movieRated = JSON.parse(movieRatedString);

            if (Array.isArray(movieRated) && movieRated.length !== 0) {
              const index = movieRated.findIndex(
                (el) => el.movieId === movie.movieId,
              );
              if (index !== -1) {
                // Найден элемент с тем же movieId, обновите его
                movieRated[index] = {
                  ...movieRated[index],
                  voteAverage: movie.voteAverage,
                };
                localStorage.setItem("movie", JSON.stringify(movieRated));
              } else {
                // Элемент с movieId не найден, добавьте новый
                movieRated.push(movie);
                localStorage.setItem("movie", JSON.stringify(movieRated));
              }
            } else {
              // Если массив пустой или не существует, создайте новый массив с новым фильмом
              localStorage.setItem("movie", JSON.stringify([movie]));
            }
          } else {
            // Если ключ "movie" не существует, создайте новый массив с новым фильмом
            localStorage.setItem("movie", JSON.stringify([movie]));
          }
        }
      });
    }
  }

  /* static GetRatedMovies(page = 1) {
     const sessionId = sessionStorage.getItem("guest_session_id");
    if (sessionId) {
      fetch(
        `https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
        this._API_KEY,
      )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    }
  } */
}
