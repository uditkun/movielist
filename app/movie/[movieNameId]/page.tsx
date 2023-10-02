import MovieDetailCard from "@/components/MovieDetailCard";
import Topbar from "@/components/TopBar";
import { fetchMovieDetails } from "@/utilities/serverActions";

async function MovieDetails({
  params,
}: // searchParams,
{
  params: { [key: string]: string | undefined };
  // searchParams: { [key: string]: string | string[] | undefined };
}) {
  const movieId = Number(params.movieNameId?.split("-").at(-1));
  const movie = await fetchMovieDetails(movieId);

  return (
    <main>
      <Topbar title="Movie Details" searchBarPresent={true} />
      <MovieDetailCard movie={movie} />
    </main>
  );
}

export default MovieDetails;
