import axios from "axios";
import type { Note, NewNote } from "../types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

const noteHubAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    accept: "application/json",
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const { data } = await noteHubAxios.get<FetchNotesResponse>("/notes", {
    params: {
      perPage: 12,
      page,
      search,
      ...(tag && tag !== "All" ? { tag } : {}),
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await noteHubAxios.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await noteHubAxios.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await noteHubAxios.delete<Note>(`/notes/${id}`);
  return data;
}
