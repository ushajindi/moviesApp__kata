import React from "react";
import Api, { GenreType } from "../../ApiServices/Api";
import { MovieType } from "../../App";

const MovieContext = React.createContext<{
  genre: GenreType[];
  setRating: (id: string | number, rating: number, movie: MovieType) => void;
}>({ genre: [], setRating: Api.setRating });
export default MovieContext;
