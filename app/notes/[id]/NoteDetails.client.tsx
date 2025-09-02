"use client";

import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import Section from "@/components/Section/Section";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";
import ErrorDetails from "./error";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Section>
      <Container>
        {note && (
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2 className={css.title}>{note.title}</h2>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
              </div>
            </div>
          </div>
        )}
        {isLoading && <Loader />}
        {isError && error && <ErrorDetails error={error} />}
      </Container>
    </Section>
  );
};

export default NoteDetailsClient;
