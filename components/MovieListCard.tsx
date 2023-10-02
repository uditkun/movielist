import Link from "next/link";
import React from "react";
import { MdImage } from "react-icons/md";
import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import { getImgURL, routeLink } from "@/utilities/helperFunctions";

function MovieListCard({ movie }: any) {
  return (
    <figure className="rounded w-full border border-gsRed my-0.5 cursor-pointer" key={movie?.id}>
      <Link href={`/movie/${routeLink(String(movie?.title))}-${movie?.id}`}>
        <div className="rounded">
          {movie?.poster_path ? (
            <Image
              className="rounded-t w-full object-cover max-h-[250px]"
              src={getImgURL(movie?.poster_path)}
              alt={movie?.title + " poster"}
              width={150}
              height={200}
            />
          ) : (
            // <img
            //   className="w-full h-full object-cover rounded-t-lg"
            //   src={getImgURL(movie?.poster_path)}
            //   alt={movie?.title + " poster"}
            // />
            <MdImage className="w-full h-[200px] p-5" />
          )}
        </div>
        <figcaption className="p-2 flex flex-col">
          <strong className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs">{movie?.title}</strong>
          <div className="flex justify-between gap-2 text-sm leading-tight">
            <p className="text-[10px] ellipsis mt-1">{movie?.overview}</p>
            <span className="flex gap-0.5 items-center font-bold self-start text-xs ">
              <BsFillStarFill className="text-gsAmber" />
              {parseFloat(movie?.vote_average).toFixed(1)}
            </span>
          </div>
        </figcaption>
      </Link>
    </figure>
  );
}

export default MovieListCard;
