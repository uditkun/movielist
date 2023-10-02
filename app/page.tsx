import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import TopBar from "@/components/TopBar";
import { Category, fetchMovieList } from "@/utilities/serverActions";

export default async function Home({
  params,
  searchParams,
}: {
  params: { [key: string]: string | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category } = params;
  const { page, search } = searchParams;
  // console.log(page, searchParams);

  const movieList = await fetchMovieList(category as Category, search?.toString(), page ? Number(page) : 1);

  const props = {
    initialMovieList: movieList,
    searchParams: { category, search, page },
  };
  const categoryHeadingText = (category ? category?.[0]?.toUpperCase() + category?.slice(1) : "Upcoming") + " Movies";
  const searchHeadingtext = "Search: " + search;

  return (
    <>
      <TopBar title="Movie List App" searchBarPresent={true} />
      <main>
        <h3 className="ml-5 mt-4 font-semibold text-xl">{search ? searchHeadingtext : categoryHeadingText}</h3>
        <InfiniteScrollContainer {...props} />
      </main>
    </>
  );
}
