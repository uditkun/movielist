import Link from "next/link";
import React from "react";
import { MdHome, MdSearch } from "react-icons/md";
import SearchInput from "./SearchInput";

function TopBar({ title, searchBarPresent }: { title: string; searchBarPresent?: boolean }) {
  return (
    <header className="flex gap-4 justify-between items-center py-3 shadow-topBar px-5 bg-gsRed sticky top-0">
      {title && <strong className="text-white">{title}</strong>}
      {searchBarPresent && (
        <div className="flex-1">
          <form className="flex gap-2 px-1.5 py-1 rounded-full items-center max-w-xl shadow-searchBar bg-white">
            <MdSearch fontSize={24} className="text-gsLightGray" />
            <div className="flex-1">
              <label htmlFor="searchBar"></label>
              <SearchInput />
            </div>
          </form>
        </div>
      )}
      <Link href="/">
        <MdHome fontSize={25} className="hover:text-white" />
      </Link>
    </header>
  );
}

export default TopBar;
