import { Category, fetchMovieList } from "@/utilities/serverActions";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useState } from "react";

//tracking the target element(span) wrt root element(document), when target intersects the root/is visible inside root, trigger an api call, then add new data in state

function useInfiniteScroller(
  targetRef: RefObject<HTMLSpanElement>,
  initialMovieList: any,
  searchParams: { category: string; search: string; page: string }
) {
  const router = useRouter();
  const [movieList, setMovieList] = useState([initialMovieList]);
  const [loading, setLoading] = useState(false);
  const [category, search] = [searchParams?.category ?? undefined, searchParams?.search ?? ""];

  useEffect(() => {
    setMovieList([initialMovieList]);
  }, [initialMovieList, search, category]);

  useEffect(() => {
    // setup options for intersection observer
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: [1.0],
    };

    const handleInView: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting === true && targetRef.current) {
          //call api and update the movielist

          const nextPage =
            movieList?.at(-1)?.total_pages > movieList?.at(-1)?.page ? movieList?.at(-1)?.page + 1 : null;
          // console.log(nextPage);
          if (nextPage) {
            setLoading(true);
            try {
              const data = await fetchMovieList(category as Category, search, nextPage);
              if (data) {
                setMovieList((movieList: any) => [...movieList, data]);
                setLoading(false);
              }
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
          }
          //disconnect the observer
          observer.disconnect();
        }
        setLoading(false);
      });
    };

    const observer = new IntersectionObserver(handleInView, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [movieList, targetRef, searchParams, search, category]);

  return { movieList, isLoading: loading };
}

export default useInfiniteScroller;
