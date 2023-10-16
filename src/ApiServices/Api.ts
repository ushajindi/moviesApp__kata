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

export interface MovieApiResponse {
  page: number;
  results: MovieResponseType[];
  total_pages: number;
  total_results: number;
}
export default class Api {
  static _Basic_Url(query: string = "return", page: number = 1): string {
    return `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  }

  static _API_KEY: string =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjVlNjNiZDRiYWI3NTRiMGU0NjlmYzI2M2YyMmM0YSIsInN1YiI6IjY1MmI3ZjZkMGNiMzM1MTZmNzQ3OTg3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jAyYNbZta3NSEViuW3z4Tx_JlAM574rW29JNZFBCM6Y";

  static async GetMoviesPage(
    page: number,
    movieName: string,
  ): Promise<MovieApiResponse> {
    const response = await fetch(this._Basic_Url(movieName, page), {
      headers: {
        Authorization: `Bearer ${this._API_KEY}`,
      },
    });
    return (await response.json()) as MovieApiResponse;
  }
}
