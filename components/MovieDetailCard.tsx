import { MdImage } from "react-icons/md/index.js";
import { BsFillStarFill } from "react-icons/bs/index.js";
import { formatMovieMin, getImgURL } from "@/utilities/helperFunctions";
import Image from "next/image";

function MovieDetailCard({ movie }: { movie: any }) {
  const { movieDetails, castDetails } = movie;
  const actorNames = castDetails?.cast
    ?.map((castMember: any) => {
      return castMember?.name;
    })
    ?.join(", ");
  const directorNames = castDetails?.directors
    ?.map((director: any) => {
      return director?.name;
    })
    ?.join(", ");

  return (
    <div className="flex justify-center w-full h-screen">
      <article className="sm:pt-20 px-5 py-3 flex gap-3 sm:gap-5 flex-col sm:flex-row w-full sm:max-w-[75%] text-sm">
        <figure>
          <div className="w-[200px] h-auto rounded mx-auto">
            {movieDetails?.poster_path ? (
              <Image
                className="rounded border-2 border-red-500"
                width={300}
                height={450}
                style={{ height: "auto" }}
                src={getImgURL(movieDetails?.poster_path, "3x")}
                alt={movieDetails?.title + " poster"}
                loading="lazy"
              />
            ) : (
              <MdImage className="w-full h-[230px] p-5" />
            )}
          </div>
          <figcaption className="hidden">{movieDetails?.title}</figcaption>
        </figure>
        <div className="flex flex-col">
          <div className="font-bold text-lg flex gap-3 justify-between sm:justify-start sm:gap-5">
            {movieDetails?.title}
          </div>
          <span className="mt-1 font-semibold inline-flex gap-1">
            <span className="flex items-center gap-1 self-center">
              <BsFillStarFill className="text-gsAmber" />
              {parseFloat(movieDetails?.vote_average).toFixed(2)}
            </span>
            <span>
              {`| ${movieDetails?.release_date?.slice(0, 4)} | ${
                movieDetails?.runtime ? formatMovieMin(movieDetails?.runtime) : "-"
              } | ${directorNames}`}
            </span>
          </span>
          <div className="mt-1 flex gap-2">
            <strong>Cast:</strong>
            <div className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap italic">
              {actorNames ?? ""}
            </div>
          </div>
          <p className="mt-1 leading-normal">
            <strong>Description:</strong> {movieDetails?.overview}
          </p>
        </div>
      </article>
    </div>
  );
}

export default MovieDetailCard;
