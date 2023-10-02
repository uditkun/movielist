"use server";
import { routeLink } from "./helperFunctions";

export type Category = "upcoming" | "top-rated" | "popular" | "now_playing";

export const fetchMovieList = async (
  category: Category | undefined | null,
  search?: string | null,
  page: number = 1
) => {
  const authToken = process.env.TMDB_API_TOKEN;
  if (!authToken) {
    throw new Error("No Auth Token Provided");
  }

  const url = search
    ? `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`
    : `https://api.themoviedb.org/3/movie/${category ?? "upcoming"}?include_adult=false&language=en-US&page=${
        page ?? 1
      }`;

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!data.ok) {
    throw new Error("Error fetching data");
  }

  const movieList = await data.json();
  return movieList;
};

export const fetchMovieDetails = async (movieId: number) => {
  const authToken = process.env.TMDB_API_TOKEN;
  if (typeof movieId !== "number") {
    throw new Error("Some Error Occured");
  }

  try {
    const finalData = {
      movieDetails: {},
      castDetails: {},
      route: {},
    };
    const res1 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((data) => data.json());

    const res2 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((data) => data.json());

    const [movieDetails, castDetails] = await Promise.allSettled([res1, res2]);
    if (movieDetails.status === "fulfilled") {
      finalData.movieDetails = movieDetails.value;
      finalData.route = `${routeLink(String(movieDetails.value?.title))}-${movieDetails.value?.id}`;
    }
    if (castDetails.status === "fulfilled") {
      finalData.castDetails = {
        cast: castDetails.value?.cast?.slice(0, 5),
        directors: castDetails.value?.crew?.filter((crewPerson: any) => crewPerson?.job === "Director"),
      };
    }
    return finalData;
  } catch (err: any) {
    throw new Error(err);
  }
};

// export const fetchSearchedMovie = async (searchWord: string) => {
//   const authToken = process.env.TMDB_API_TOKEN;
//   if (!searchWord) return;
//   if (!authToken) throw new Error("No Auth Token Provided");

//   const res = await fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=1`
//   );

//   if (!res.ok) throw new Error("Error fetching data");
//   const data = await res.json();
//   return data;
// };
