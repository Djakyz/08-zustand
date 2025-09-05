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
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutation.mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/All");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          onChange={handleChange}
          value={draft.title}
          name="title"
          type="text"
          required
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          className={css.input}
          onChange={handleChange}
          value={draft.content}
          name="content"
          rows={8}
          required
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
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
          <option value="Todo">Todo</option>
        </select>
      </label>

      <button type="submit" className={css.submitButton}>
        Submit
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleCancel();
        }}
        type="button"
        className={css.cancelButton}
      >
        Cancel
      </button>
    </form>
  );
}
