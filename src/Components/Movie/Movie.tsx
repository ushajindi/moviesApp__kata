import { Image, Rate, Typography } from "antd";
import MovieContext from "../Context/MovieContext";
import { formatDate, formatRatingCirle, ShortingOverview } from "./helpers";
import { MovieType } from "../App";
import "./Movie.css";
import noImg from "../../Public/img/no_image.jpg";

type PropsType = {
  movie: MovieType;
};
function Movie({
  movie: {
    movieId,
    releaseDate,
    originalTitle,
    popularity,
    voteAverage,
    overview,
    backdropPath,
    genreIds,
  },
  movie,
}: PropsType) {
  return (
    <div className="movie">
      <div className="movie__card">
        <MovieContext.Consumer>
          {({ genre, setRating, page }) => {
            if (genre != null && genre.length !== 0) {
              return (
                <>
                  <div className="movie__card__img__inner">
                    <Image
                      fallback={noImg}
                      className="movie__card__img"
                      src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
                    />
                  </div>
                  <div className="movie__card__info">
                    <div className="movie__card__info__text">
                      <Typography.Title
                        style={{ padding: "0", margin: "0" }}
                        level={3}
                      >
                        {originalTitle}
                      </Typography.Title>
                      <div className="movie__card__info__circle__rating__inner">
                        <div
                          className={formatRatingCirle(
                            Number(popularity.toFixed(1)),
                          )}
                        >
                          {popularity < 9.9 ? popularity.toFixed(1) : 0}
                        </div>
                      </div>
                    </div>
                    <div className="movie__card__info__date">
                      <Typography.Text type="secondary">
                        {releaseDate ? formatDate(releaseDate) : "no date"}
                      </Typography.Text>
                    </div>
                    <div className="movie__card__info__genre">
                      {genreIds.map((el) => {
                        return genre.map(({ id, name }) => {
                          if (el === id) {
                            return (
                              <Typography.Text key={Date.now()} code>
                                {name}
                              </Typography.Text>
                            );
                          }
                          return <> </>;
                        });
                      })}
                    </div>
                    <div className="movie__card__info__about">
                      <Typography.Paragraph style={{ margin: "0" }}>
                        {ShortingOverview(overview) || "Not About"}
                      </Typography.Paragraph>
                    </div>
                    <div className="movie__card__info__rating">
                      <Rate
                        className="movie__card__info__rating__rate"
                        onChange={(e) => {
                          setRating(movieId, Number(e), {
                            ...movie,
                            voteAverage: e,
                          });
                        }}
                        count={10}
                        allowHalf
                        defaultValue={
                          page === "Rated" ? Number(voteAverage.toFixed(2)) : 0
                        }
                      />
                    </div>
                  </div>
                </>
              );
            }
            return <> </>;
          }}
        </MovieContext.Consumer>
      </div>
    </div>
  );
}

export default Movie;
