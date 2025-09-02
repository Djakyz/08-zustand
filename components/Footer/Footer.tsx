import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Olha Berketa</p>
          <p>
            Contact us:&nbsp;
            <a href="mailto:olgaberketa@gmail.com">olgaberketa@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
