import css from "./not-found.module.css";

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
