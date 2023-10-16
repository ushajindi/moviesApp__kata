import { Component } from "react";
import "./Movie.css";
import { Image, Rate, Typography } from "antd";
import { format } from "date-fns";
import noImg from "../../img/no_image.jpg";
import { MovieType } from "../../App";

type PropsType = {
  movie: MovieType;
};

class Movie extends Component<PropsType> {
  render() {
    const {
      movie: {
        releaseDate,
        originalTitle,
        popularity,
        voteAverage,
        overview,
        backdropPath,
      },
    } = this.props;

    function ShortingOverview(text: string) {
      if (text.length < 22) return text;
      return `${text.split(" ").slice(0, 22).join(" ")} ...`;
    }

    function formatDate(date: string) {
      return format(new Date(date), "MMMM-dd-yyyy");
    }

    function formatRatingCirle(rating: number) {
      if (rating < 3.9) return "movie__card__info__circle__rating low";
      if (rating < 7.9) return "movie__card__info__circle__rating middle";
      if (rating > 7.9 && rating <= 9.9)
        return "movie__card__info__circle__rating high";
      if (rating > 9.9) return "movie__card__info__circle__rating low";
      return " ";
    }

    return (
      <div className="movie">
        <div className="movie__card">
          <div className="movie__card__img__inner">
            <Image
              fallback={noImg}
              className="movie__card__img"
              src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
            />
          </div>
          <div className="movie__card__info">
            <div className="movie__card__info__text">
              <Typography.Title style={{ padding: "0", margin: "0" }} level={3}>
                {originalTitle}
              </Typography.Title>
              <div className="movie__card__info__circle__rating__inner">
                <div
                  className={formatRatingCirle(Number(popularity.toFixed(1)))}
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
              <Typography.Text code>action</Typography.Text>
              <Typography.Text code>action</Typography.Text>
            </div>
            <div className="movie__card__info__about">
              <Typography.Paragraph style={{ margin: "0" }}>
                {ShortingOverview(overview) || "Not About"}
              </Typography.Paragraph>
            </div>
            <div className="movie__card__info__rating">
              <Rate
                allowHalf
                defaultValue={Number((voteAverage * 0.5).toFixed(2))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movie;
