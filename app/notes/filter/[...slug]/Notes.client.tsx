"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Link from "next/link";

interface NotesClientProps {
  tag: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(isLoading);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 300);
  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <Link href={"/notes/action/create/"} className={css.button}>
          Create note +
        </Link>
      </header>

      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Notes not found</p>
      )}
      {isLoading && !data && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default NotesClient;
