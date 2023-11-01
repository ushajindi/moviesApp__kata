import { format } from "date-fns";

export function ShortingOverview(text: string) {
  if (text.length < 22) return text;
  return `${text.split(" ").slice(0, 22).join(" ")} ...`;
}

export function formatDate(date: string) {
  return format(new Date(date), "MMMM-dd-yyyy");
}

export function formatRatingCirle(rating: number) {
  if (rating < 3.0) return "movie__card__info__circle__rating low";
  if (rating > 3.0 && rating < 5.0)
    return "movie__card__info__circle__rating middle__low";
  if (rating < 7.0 && rating >= 5.0)
    return "movie__card__info__circle__rating middle";
  if (rating >= 7.0 && rating <= 9.9)
    return "movie__card__info__circle__rating high";
  if (rating > 9.9) return "movie__card__info__circle__rating low";
  return ` `;
}
