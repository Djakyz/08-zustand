import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 Page",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "404 Page",
    description: "Sorry, the page you are looking for does not exist.",
    images: [
      {
        alt: "Note Hub - Note Taking App",
        url: "https://08-zustand-iota-nine.vercel.app/404-error-page.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const notFound = () => {
  return (
    <div className={css.notFound}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default notFound;
