import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <Section>
      <Container>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag={tag} />
        </HydrationBoundary>
      </Container>
    </Section>
  );
};

export default Notes;
