"use client";

import React, { useRef } from "react";
import MovieListCard from "./MovieListCard";
import useInfiniteScroller from "@/hooks/useInfiniteScroller";

function InfiniteScrollContainer(props: any) {
  const targetRef = useRef<HTMLSpanElement>(null);

  const { movieList, isLoading } = useInfiniteScroller(targetRef, props.initialMovieList, props.seachParams);
  const displayMovieList = movieList.map((moviesData: any) => moviesData?.results)?.flat();

  return (
    <>
      <div key={Math.random()} className="px-5 py-4 grid grid-cols-movieList gap-3 mx-auto justify-center">
        {displayMovieList.map((movie: any) => {
          return <MovieListCard key={movie?.id} movie={movie} />;
        })}
      </div>
      {isLoading ? (
        <div className="lds-dual-ring"></div>
      ) : (
        <span ref={targetRef} className="my-4 invisible">
          Load More
        </span>
      )}
    </>
  );
}

export default InfiniteScrollContainer;
