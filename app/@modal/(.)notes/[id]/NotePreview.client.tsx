"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

const NotePreview = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

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
    <Modal closeModal={handleClose}>
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
            <button className={css.backBtn} onClick={handleClose}>
              Back
            </button>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Oops something went wrong... {error.message}</p>}
    </Modal>
  );
};

export default NotePreview;
