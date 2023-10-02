"use client";

import React from "react";
import { debounce } from "@/utilities/helperFunctions";
import { useRouter } from "next/navigation";

function SearchInput() {
  const router = useRouter();
  // const searchParams=useSearchParams();

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      router.push("/");
      return;
    }
    router.push(`?search=${e.target.value}`);
  });

  return (
    <input
      className="rounded w-full block focus:outline-none"
      type="text"
      name="search"
      id="searchBar"
      placeholder="Search"
      onChange={handleChange}
    />
  );
}

export default SearchInput;
