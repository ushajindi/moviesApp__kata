import React from "react";
import Api, { GenreType } from "../../ApiServices/Api";
import { MovieType } from "../App";

const MovieContext = React.createContext<{
  genre: GenreType[];
  setRating: (id: string | number, rating: number, movie: MovieType) => void;
  page: "Search" | "Rated";
}>({ genre: [], setRating: Api.setRating, page: "Search" });
export default MovieContext;
