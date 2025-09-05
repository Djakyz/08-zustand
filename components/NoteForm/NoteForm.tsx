"use client";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import { NewNote } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
      clearDraft();
    },
  });
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutation.mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/All");

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          onChange={handleChange}
          value={draft.title}
          name="title"
          type="text"
        />
      </label>
      <label className={css.formGroup}>
        Content
        <input
          className={css.input}
          onChange={handleChange}
          value={draft.content}
          name="content"
          type="textarea"
        />
      </label>
      <label className={css.formGroup}>
        Tag
        <select
          className={css.input}
          onChange={handleChange}
          value={draft.tag}
          name="tag"
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="meeting">Meeting</option>
          <option value="shopping">Shopping</option>
          <option value="todo">Todo</option>
        </select>
      </label>
      <button type="submit" className={css.submitButton}>
        Submit
      </button>
      <button onClick={handleCancel} type="button" className={css.cancelButton}>
        Cancel
      </button>
    </form>
  );
}
